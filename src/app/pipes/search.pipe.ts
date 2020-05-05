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

    const result = todos.filter((todo: Todo) => this.checkForMatch(todo, searchWord));

    if (!result.length) {
      this.snackBar.open('Not found', 'Undo', { duration: 2000 });
    }

    return result;
  }

  private checkForMatch = (todo: Todo, searchWord: string): boolean => {
    return todo.title.toLowerCase().includes(searchWord);
  }

}
