import { Injectable } from '@angular/core';
import { Task } from './models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskFactoryServiceService {

  constructor() { }

  private generateId(): number{
    return Math.floor(Math.random() * 99999);
  }

  private verifyTaskOptions(options): boolean{
    if(options.name && options.color && options.startTime && options.endTime){
      return true;
    }
    throw new Error("Invalid parameters provided for the task. Requires name, color, startTime, endTime");
  }

  public createTask(options): Task{
    if(this.verifyTaskOptions(options)){
      const task = new Task();
      task.id = this.generateId();
      task.name = options.name;
      task.color = options.color;
      task.startTime = options.startTime;
      task.endTime = options.endTime;
      return task;
    }
  }
}
