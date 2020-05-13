import {DataStoreService} from '../../services/data-store.service';
import {AddTodoDialogComponent} from '../add-todo-dialog/add-todo-dialog.component';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Todo} from '../../interfaces/todo';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public query: string;
  public todos$: Observable<Todo[]>;
  public filterValue: string;

  constructor(
    private dataStore: DataStoreService,
    private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.todos$ = this.dataStore.getTodos();
  }

  public addTodo(): void {
    this.dialog.open(AddTodoDialogComponent);
  }

  public clearSearch(): void {
    this.query = '';
  }

  public clearFilter(): void {
    this.filterValue = null;
  }
}
