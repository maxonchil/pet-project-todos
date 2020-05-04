import { TodoResponse } from '../interfaces/todo-responce';
import { environment as env } from './../../environments/environment';
import { Todo } from './../interfaces/todo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient) {
  }

  public getTodosRequest(): Observable<TodoResponse> {
    return this.http.get<TodoResponse>(`${env.apiURL}/todos/getAll`);
  }

  public deleteTodoRequest(todo: Todo): Observable<TodoResponse> {
    return this.http.delete<TodoResponse>(`${env.apiURL}/todos/delete${todo._id}`);
  }
  public updateTodoRequest(todo: Todo): Observable<TodoResponse> {
    return this.http.put<TodoResponse>(`${env.apiURL}/todos/update${todo._id}`, { title: todo.title, completed: todo.completed });
  }

  public addTodoRequest(todo: Todo): Observable<TodoResponse> {
    return this.http.post<TodoResponse>(`${env.apiURL}/todos/add`, { todo });
  }

}
