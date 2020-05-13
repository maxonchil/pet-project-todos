import {MatSnackBar} from '@angular/material/snack-bar';
import {Todo} from '../interfaces/todo';
import {DataService} from './data.service';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  public todos$ = new Subject<Todo[]>();
  public todosCache: Todo[];

  constructor(private dataService: DataService, private snackBar: MatSnackBar) {
  }

  private fetchAll(): any {
    this.dataService.getTodosRequest().subscribe(({data}) => {
      this.todosCache = data.todos;
      this.todos$.next(data.todos);
    });
  }

  public getTodos(): Observable<Todo[]> {
    this.fetchAll();
    return this.todos$.asObservable();
  }

  public addTodo(todo: Todo): void {
    this.dataService.addTodoRequest(todo)
      .subscribe(({data, message}) => {
        this.todosCache = [...this.todosCache, data.todo];
        this.todos$.next(this.todosCache);
        this.snackBar.open(message, 'Dismiss', {duration: 2000});
      });
  }

  public updateTodo(updatedTodo: Todo): void {
    this.dataService.updateTodoRequest(updatedTodo)
      .subscribe(({data, message}) => {
        this.todos$.next(this.todosCache
          .map((todo) => todo._id === data.todo._id ? data.todo : todo));
        this.snackBar.open(message, 'Dismiss', {duration: 2000});
      });

  }

  public deleteTodo(deletedTodo: Todo): void {
    this.dataService.deleteTodoRequest(deletedTodo)
      .subscribe(({data, message}) => {
        this.todos$.next(data.todos);
        this.todosCache = data.todos;
        this.snackBar.open(message, 'Dismiss', {duration: 2000});
      });
  }
}
