import { Injectable } from '@angular/core';
import { Task } from './models/task';
import * as _ from 'lodash';
import { TaskFactoryService } from './task-factory-service';

@Injectable({
  providedIn: 'root'
})
export class TaskRepositoryServiceService {

  private LOCAL_STORAGE_TASKS_ID;
  private tasks: object;

  constructor(private taskFactoryService: TaskFactoryService) { 
    this.LOCAL_STORAGE_TASKS_ID = "timeKeeperTasks";
    this.tasks = this.getTasksInLocalStorage();
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
    return this.parseObjecTaskIntoTypeScriptTaskCLass(JSON.parse(tasksObjectString));
  }

  private parseObjecTaskIntoTypeScriptTaskCLass(tasksObject: any){
    const returnTasks = {};
    const that = this;
    if(!_.isEmpty(tasksObject)){
      _.forEach(tasksObject, function(taskObject){
        returnTasks[taskObject._id] = that.taskFactoryService.cloneTaskObjectToTaskClass(taskObject);
      });
    }
    return returnTasks;
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
