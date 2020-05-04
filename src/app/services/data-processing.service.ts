import { TodoPriorities } from 'src/app/enums/todo-priorities.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../interfaces/todo';
import { debounceTime, takeUntil, map } from 'rxjs/operators';
import { DataStoreService } from './data-store.service';
import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProcessingService implements OnDestroy {
  private notifier = new Subject();
  public wasFiltred = false;

  constructor(private dataStore: DataStoreService, private snackBar: MatSnackBar) {

  }

  public searchByWord(element: HTMLInputElement): void {
    fromEvent(element, 'input')
      .pipe(debounceTime(500), takeUntil(this.notifier))
      .subscribe((event: InputEvent) => {
        const value = (event.target as HTMLInputElement).value;

        if (!value) {
          this.dataStore.todos$.next(this.dataStore.todosBackup);
        }

        const result = this.dataStore.todosBackup.filter((todo: Todo) => todo.title.includes(value));
        this.dataStore.todos$.next(result);

        if (!result.length) {
          this.snackBar.open('Not found', 'Undo', { duration: 2000 });
        }
      });
  }

  public todoFilter(value: string): void {
    this.wasFiltred = true;
    switch (value) {
      case 'deadline_comming': {
        this.dataStore.todos$
          .next([...this.dataStore.todosBackup]
            .sort((a: Todo, b: Todo) => this.compareByDate(a, b, 'up')));
        break;
      }
      case 'deadline_latest': {
        this.dataStore.todos$
          .next([...this.dataStore.todosBackup]
            .sort((a: Todo, b: Todo) => this.compareByDate(a, b, 'down')));
        break;
      }
      case 'priority_high': {
        this.dataStore.todos$
          .next([...this.dataStore.todosBackup]
            .sort((a: Todo, b: Todo) => TodoPriorities[b.priority] - TodoPriorities[a.priority]));
        break;
      }
      case 'priority_low': {
        this.dataStore.todos$
          .next([...this.dataStore.todosBackup]
            .sort((a: Todo, b: Todo) => TodoPriorities[a.priority] - TodoPriorities[b.priority]));
        break;
      }
      case 'done': {
        this.dataStore.todos$
          .next(this.dataStore.todosBackup.filter((todo: Todo) => todo.completed));
        break;
      }
      case 'in_progress': {
        this.dataStore.todos$.next(this.dataStore.todosBackup.filter((todo: Todo) => !todo.completed));
        break;
      }
      default: {
        this.dataStore.todos$.next(this.dataStore.todosBackup);
      }
    }
  }
  public clearFilter(): void {
    this.dataStore.todos$.next(this.dataStore.todosBackup);
    this.wasFiltred = false;
  }

  private compareByDate(a: Todo, b: Todo, direction: string): number {
    const date1 = new Date(a.date).getTime();
    const date2 = new Date(b.date).getTime();

    if (direction === 'up') {
      return date1 === date2 ? this.compareByTime(a.time, b.time, 'up') : date1 - date2;
    }
    return date2 === date1 ? this.compareByTime(a.time, b.time, 'down') : date2 - date1;
  }

  private compareByTime(firstTime, secondTIme, direction: string): number {
    const firstHour = Number(firstTime.split(':')[0]);
    const firstMinuts = Number(firstTime.split(':')[1]);
    const secondHour = Number(secondTIme.split(':')[0]);
    const secondMinutes = Number(secondTIme.split(':')[1]);

    if (direction === 'up') {
      return firstHour === secondHour ? firstMinuts - secondMinutes : firstHour - secondHour;
    }
    return firstHour === secondHour ? secondMinutes - firstMinuts : secondHour - firstHour;
  }


  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
