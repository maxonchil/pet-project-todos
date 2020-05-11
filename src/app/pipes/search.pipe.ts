import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from './../interfaces/todo';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  constructor(private snackBar: MatSnackBar) { }

  transform(todos: Todo[], query: string = ''): any {
    if (!query) {
      return todos;
    }
    const searchWord = query.toString().toLowerCase();

    return todos.filter((todo: Todo) => this.checkForMatch(todo, searchWord));
  }

  private checkForMatch = (todo: Todo, searchWord: string): boolean => {
    return todo.title.toLowerCase().includes(searchWord);
  }

}
