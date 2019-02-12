import { Injectable } from '@angular/core';
import { Task } from './models/task';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TaskRepositoryServiceService {

  private LOCAL_STORAGE_TASKS_ID;
  private tasks;

  constructor() { 
    this.LOCAL_STORAGE_TASKS_ID = "timeKeeperTasks";
    localStorage.setItem(this.LOCAL_STORAGE_TASKS_ID, JSON.stringify({}));
  }

  private setTasksInLocalStorage(tasks:object): boolean{
    localStorage.setItem(this.LOCAL_STORAGE_TASKS_ID, JSON.stringify(tasks));
    return true;
  }

  private getTasksInLocalStorage(): object{
    return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_TASKS_ID));
  }

  public addTask(task:Task): boolean{
    let tasks = this.getTasksInLocalStorage();
    if(task.id && !tasks[task.id]){
      tasks[task.id] = task;
      this.setTasksInLocalStorage(tasks);
      return true;
    }
    return false;
  }

  public removeTask(task:Task): boolean{
    let tasks = this.getTasksInLocalStorage();
    if(task.id && tasks[task.id]){
      delete tasks[task.id];
      this.setTasksInLocalStorage(tasks);
      return true;
    }
    return false;
  }

  public updateTask(task:Task): boolean{
    let tasks = this.getTasksInLocalStorage();
    if(task.id && tasks[task.id]){
      tasks[task.id] = task;
      this.setTasksInLocalStorage(tasks);
      return true;
    }
    return false;
  }
  
  public getAllTasks(): object{
    return this.getTasksInLocalStorage();
  }
}
