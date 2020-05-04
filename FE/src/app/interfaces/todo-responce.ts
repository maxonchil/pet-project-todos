import { Todo } from './todo';

export interface TodoResponse {
  status: string;
  message: string;
  data?: Data;

}

interface Data {
  todo?: Todo;
  todos?: Todo[];
}
