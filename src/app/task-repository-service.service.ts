import { Injectable } from '@angular/core';
import { Task } from './models/task';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TaskRepositoryServiceService {

  private LOCAL_STORAGE_TASKS_ID;
  private tasks: object;

  constructor() { 
    this.LOCAL_STORAGE_TASKS_ID = "timeKeeperTasks";
    let tasksObject = this.getTasksInLocalStorage();
    this.tasks = this.convertTasksObjectToTaskClassHashMap(tasksObject)
  }

  private setTasksInLocalStorage(tasks:object): boolean{
    localStorage.setItem(this.LOCAL_STORAGE_TASKS_ID, JSON.stringify(tasks));
    return true;
  }

  private getTasksInLocalStorage(): object{
    let tasksObjectString = localStorage.getItem(this.LOCAL_STORAGE_TASKS_ID)
    if(_.isNil(tasksObjectString)){
      this.setTasksInLocalStorage({});
      return {};
    }
    return JSON.parse(tasksObjectString);
  }

  private convertTasksObjectToTaskClassHashMap(tasksObject): object{
    let tasks = {};
    _.forEach(tasksObject, function(taskObject: any){
      let task = new Task();
      task.id = taskObject.id;
      task.name = taskObject.name;
      task.startTime = new Date(taskObject.startTime);
      task.endTime = new Date(taskObject.endTime);
      task.color = taskObject.color;
      tasks[taskObject.id] = task;
    })
    return tasks;
  }

  public addTask(task:Task): boolean{
    if(task.id && !this.tasks[task.id]){
      this.tasks[task.id] = task;
      this.setTasksInLocalStorage(this.tasks);
      return true;
    }
    return false;
  }

  public removeTask(task:Task): boolean{
    if(task.id && this.tasks[task.id]){
      delete this.tasks[task.id];
      this.setTasksInLocalStorage(this.tasks);
      return true;
    }
    return false;
  }

  public updateTask(task:Task): boolean{
    if(task.id && this.tasks[task.id]){
      this.tasks[task.id] = task;
      this.setTasksInLocalStorage(this.tasks);
      return true;
    }
    return false;
  }
  
  public getAllTasks(): object{
    return this.tasks;
  }
}
