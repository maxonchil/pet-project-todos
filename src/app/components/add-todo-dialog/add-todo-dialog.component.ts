import { Validate } from './../../interfaces/validate';
import { TodoPriorities } from 'src/app/enums/todo-priorities.enum';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataStoreService } from 'src/app/services/data-store.service';


@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.scss'],

})
export class AddTodoDialogComponent implements OnInit {
  public minDate: Date;
  public todoForm: FormGroup;
  public priorities: typeof TodoPriorities;

  constructor(private fb: FormBuilder, private dataStore: DataStoreService) {
    this.minDate = new Date();
    this.priorities = TodoPriorities;
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', [Validators.minLength(2), Validators.maxLength(100), Validators.required]],
      date: [this.minDate, [this.dateValidator, Validators.required]],
      time: ['', [Validators.required]],
      priority: ['', Validators.required],
    });
  }

  public checkForError(control: string, errorType: string): boolean {
    if (this.todoForm.controls[control].errors?.[errorType] &&
      this.todoForm.controls[control].touched) {
      return true;
    }
    return false;
  }

  public createNewTodo(): void {
    const todo = {
      title: this.todoForm.get('title').value,
      completed: false,
      date: (this.todoForm.get('date').value as Date).toLocaleDateString(),
      time: this.todoForm.get('time').value,
      priority: this.todoForm.get('priority').value,
    }
    this.dataStore.addTodo(todo);
  }


  private dateValidator(control: FormControl): Validate {
    const date = (control.value as Date);
    if (!date) {
      return { days: true };
    }
    const validate = date.toLocaleDateString()
      .match(/\d{1,2}\/\d{1,2}\/\d{4}/);

    if (!validate) {
      return { days: true };
    }
    return null;
  }

}
