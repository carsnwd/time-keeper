import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'timeFormat'
  })
  export class TimeFormatPipe implements PipeTransform {
    private getTimeFormatString(hours: number, minutes: number, seconds: number) {
        let secondsString = '00';
        let minutesString = '00';
        let hoursString = '00';

        if (hours > 9) {
            hoursString = hours.toString();
        } else {
            hoursString = '0' + hours;
        }

        if (minutes > 9) {
            minutesString = minutes.toString();
        } else {
            minutesString = '0' + minutes;
        }

        if (seconds > 9) {
            secondsString = seconds.toString();
        } else {
            secondsString = '0' + seconds;
        }

        return hoursString + ':' + minutesString + ':' + secondsString;
    }

    transform(miliseconds: number): string {
        let seconds = Math.trunc(miliseconds / 1000);
        let minutes = Math.trunc(seconds / 60);
        const hours = Math.trunc(minutes / 60);
        if (seconds > 59) {
            seconds = seconds - (60 * minutes);
        }

        if (minutes > 59) {
            minutes = minutes - (60 * hours);
        }
        return this.getTimeFormatString(hours, minutes, seconds);
    }
  }
