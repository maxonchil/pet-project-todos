import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat12h'
})
export class TimeFormat12hPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const time = value.split(':');
    let hours = time[0];
    const minutes = this.toDoubleCharacters(time[1]);
    let dayPart = 'AM';

    if (+hours > 12) {
      dayPart = 'PM';
      hours = this.toDoubleCharacters(String(+hours - 12));
    }

    return `${hours}:${minutes} ${dayPart}`;
  }

  toDoubleCharacters(time: string): string {
    let result = time;
    if (time.length === 1) {
      result = '0' + time;
    }
    return result;
  }
}
