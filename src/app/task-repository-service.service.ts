import { Injectable } from '@angular/core';
import { Task } from './models/task';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TaskRepositoryServiceService {

  constructor() { }

  private LOCAL_STORAGE_TASKS_ID = "timeKeeperTasks";

  private setTasksInLocalStorage(tasks:Map<number, Task>): boolean{
    localStorage.setItem(this.LOCAL_STORAGE_TASKS_ID, JSON.stringify(tasks));
    return true;
  }

  private getTasksInLocalStorage(): Map<number, Task>{
    return new Map(JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_TASKS_ID)));
  }

  public addTask(task:Task): boolean{
    let tasks = this.getTasksInLocalStorage();
    if(task.id && tasks[task.id]){
      tasks.set(task.id, task);
      this.setTasksInLocalStorage(tasks);
      return true;
    }
    return false;
  }

  public removeTask(task:Task): boolean{
    let tasks = this.getTasksInLocalStorage();
    if(task.id && tasks.get(task.id)){
      tasks.delete(task.id);
      this.setTasksInLocalStorage(tasks);
      return true;
    }
    return false;
  }

  public updateTask(task:Task): boolean{
    let tasks = this.getTasksInLocalStorage();
    if(task.id && tasks.get(task.id)){
      tasks.set(task.id, task);
      this.setTasksInLocalStorage(tasks);
      return true;
    }
    return false;
  }
  
  public getAllTasks(): Map<number, Task>{
    return this.getTasksInLocalStorage();
  }
}
