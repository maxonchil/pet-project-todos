import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from '../interfaces/todo';
import {TodoPriorities} from '../enums/todo-priorities.enum';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[], filterValue: string): Todo[] {

    switch (filterValue) {
      case 'deadline_coming': {
        return [...todos]
          .sort((a: Todo, b: Todo) => this.compareByDate(a, b, 'up'));
      }
      case 'deadline_latest': {
        return [...todos]
          .sort((a: Todo, b: Todo) => this.compareByDate(a, b, 'down'));
      }
      case 'priority_high': {
        return [...todos]
          .sort((a: Todo, b: Todo) => TodoPriorities[b.priority] - TodoPriorities[a.priority]);
      }
      case 'priority_low': {
        return [...todos]
          .sort((a: Todo, b: Todo) => TodoPriorities[a.priority] - TodoPriorities[b.priority]);
      }
      case 'done': {
        return todos.filter((todo: Todo) => todo.completed);
      }
      case 'in_progress': {
        return todos.filter((todo: Todo) => !todo.completed);
      }
      default: {
        return todos;
      }
    }
  }

  private compareByDate(a: Todo, b: Todo, direction: string): number {
    const date1 = new Date(a.date).getTime();
    const date2 = new Date(b.date).getTime();

    if (direction === 'up') {
      return date1 === date2 ? this.compareByTime(a.time, b.time, 'up') : date1 - date2;
    }
    return date2 === date1 ? this.compareByTime(a.time, b.time, 'down') : date2 - date1;
  }

  private compareByTime(firstTime, secondTIme, direction: string): number {
    const firstHour = Number(firstTime.split(':')[0]);
    const firstMinuts = Number(firstTime.split(':')[1]);
    const secondHour = Number(secondTIme.split(':')[0]);
    const secondMinutes = Number(secondTIme.split(':')[1]);

    if (direction === 'up') {
      return firstHour === secondHour ? firstMinuts - secondMinutes : firstHour - secondHour;
    }
    return firstHour === secondHour ? secondMinutes - firstMinuts : secondHour - firstHour;
  }
}
