import { DataProcessingService } from '../../services/data-processing.service';
import { DataStoreService } from './../../services/data-store.service';
import { AddTodoDialogComponent } from './../add-todo-dialog/add-todo-dialog.component';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  constructor(
    public dataStore: DataStoreService,
    private dialog: MatDialog,
    public dataProcessing: DataProcessingService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataProcessing.searchByWord(this.searchInput.nativeElement);
  }

  public addTodo(): void {
    this.dialog.open(AddTodoDialogComponent);
  }
}
