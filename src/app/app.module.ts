
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTodoDialogComponent } from './components/add-todo-dialog/add-todo-dialog.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TimeFormat12hPipe } from './pipes/time-format12h.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { MaterialShareModule } from './material-share-module/material-share.module';
import { FilterPipe } from './pipes/filter.pipe';




@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    AddTodoDialogComponent,
    TodoItemComponent,
    TimeFormat12hPipe,
    SearchPipe,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
