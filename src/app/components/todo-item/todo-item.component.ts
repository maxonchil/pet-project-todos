import { DataStoreService } from 'src/app/services/data-store.service';
import { Todo } from './../../interfaces/todo';
import { Component, OnInit, Input } from '@angular/core';
import { TodoPriorities } from 'src/app/enums/todo-priorities.enum';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;

  public editTodoID: string;
  public updatedTodo: string;

  constructor(private dataStore: DataStoreService) {

  }

  ngOnInit(): void {
  }

  public editTodo(todo: Todo): void {
    if (!this.editTodoID) {
      this.editTodoID = todo._id;
      this.updatedTodo = todo._id;
      return;
    }
    this.editTodoID = undefined;
  }
  public deleteTodo(todo: Todo): void {
    this.dataStore.deleteTodo(todo);
  }


  public completeTodo(todo: Todo): void {
    this.updatedTodo = todo._id;
  }

  public updateTodo(todo: Todo): void {
    this.dataStore.updateTodo(todo);
    this.editTodoID = undefined;
  }


  public getPriority(key: string): string {
    return TodoPriorities[key];
  }
}
