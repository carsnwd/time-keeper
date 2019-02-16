import { Component, OnChanges, Input} from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.less']
})
export class TaskDetailsComponent implements OnChanges {

  @Input() task: Task;

  public deleteTask(): boolean{
    return true;
  }

  public editTask(): boolean{
    return true;
  }

  public activateTask(): boolean{
    return true;
  }

  public deactivateTask(): boolean{
    return true;
  }

  ngOnChanges(){
    
  }
}
