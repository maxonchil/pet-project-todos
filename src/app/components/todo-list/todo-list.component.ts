import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { DataProcessingService } from '../../services/data-processing.service';
import { DataStoreService } from './../../services/data-store.service';
import { AddTodoDialogComponent } from './../add-todo-dialog/add-todo-dialog.component';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, Observable, Subject } from 'rxjs';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  public query: string;
  private notifier = new Subject();
  public todos$: Observable<any[]>;

  constructor(
    // do not use public services in component
    public dataStore: DataStoreService,
    private dialog: MatDialog,
    public dataProcessing: DataProcessingService,
    // unused service
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.todos$ = this.dataStore.getTodos();
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input').pipe(takeUntil(this.notifier))
      .subscribe(event => this.query = (event.target as HTMLInputElement).value);
  }

  public addTodo(): void {
    this.dialog.open(AddTodoDialogComponent);
  }

  public clearSearch(): void {
    this.query = '';
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
