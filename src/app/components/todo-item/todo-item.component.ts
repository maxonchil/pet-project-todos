import { DataStoreService } from 'src/app/services/data-store.service';
import { Todo } from '../../interfaces/todo';
import { Component, OnInit, Input } from '@angular/core';

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
      return;
    }
    // do not use undefined as manually set value
    this.editTodoID = null;
  }
  public deleteTodo(todo: Todo): void {
    this.dataStore.deleteTodo(todo);
  }


  public completeTodo(todo: Todo): void {
    this.updatedTodo = todo._id;
  }

  public updateTodo(todo: Todo): void {
    this.dataStore.updateTodo(todo);
    this.editTodoID = null;
  }
}
