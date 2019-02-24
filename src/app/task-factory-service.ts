import { Injectable } from '@angular/core';
import { Task } from './models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskFactoryService {

  constructor() { }

  private generateId(): number{
    return Math.floor(Math.random() * 99999);
  }

  private verifyTaskOptions(options): boolean {
    if (options.name) {
      return true;
    }
    throw new Error('Invalid parameters provided for the task. Requires name');
  }

  public createTask(options): Task {
    if (this.verifyTaskOptions(options)) {
      const task = new Task();
      task.id = this.generateId();
      task.name = options.name;
      task.startTime = options.startTime;
      task.endTime = options.endTime;
      task.isActive = options.isActive || false;
      task.runningTime = 0;
      task.previousRunningTime = 0;
      return task;
    }
  }

  public cloneTaskObjectToTaskClass(taskObject: any): Task {
    const task = new Task();
    task.id = taskObject._id;
    task.name = taskObject._name;
    task.startTime = taskObject._startTime;
    task.endTime = taskObject._endTime;
    task.isActive = taskObject._isActive;
    task.runningTime = taskObject._runningTime;
    task.previousRunningTime = taskObject._previousRunningTime;
    return task;
  }
}
