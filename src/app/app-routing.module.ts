import {TodoListComponent} from './components/todo-list/todo-list.component';
import {AppComponent} from './app.component';
import {NgModule, Component} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
