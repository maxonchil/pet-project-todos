import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from './../interfaces/todo';
import { DataService } from './data.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private todos$ = new Subject<Todo[]>();
  public todosBackup: Todo[];

  constructor(private dataService: DataService, private snackBar: MatSnackBar) {
    // move to a separate method and call on OnInit in todo-list.component.ts
    this.dataService.getTodosRequest().subscribe(({data}) => {
      this.todosBackup = data.todos;
      this.todos$.next(data.todos);
    });
  }

  getTodos(): Observable<Todo[]> {
    return this.todos$.asObservable();
  }

  public addTodo(todo: Todo): void {
    this.dataService.addTodoRequest(todo)
      .subscribe(({ data, message }) => {
        this.todosBackup = [...this.todosBackup, data.todo];
        this.todos$.next(this.todosBackup);
        this.snackBar.open(message, 'Dismiss', { duration: 2000 });
      });
  }

  public updateTodo(updatedTodo: Todo): void {
    this.dataService.updateTodoRequest(updatedTodo)
      .subscribe(({ data, message }) => {
        this.todos$.next(this.todosBackup
          .map((todo) => todo._id === data.todo._id ? data.todo : todo));
        this.snackBar.open(message, 'Dismiss', { duration: 2000 });
      });

  }

  public deleteTodo(deletedTodo: Todo): void {
    this.dataService.deleteTodoRequest(deletedTodo)
      .subscribe(({ data, message }) => {
        this.todos$.next(data.todos);
        this.todosBackup = data.todos;
        this.snackBar.open(message, 'Dismiss', { duration: 2000 });
      });
  }
}
