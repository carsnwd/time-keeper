import { Component, OnInit } from '@angular/core';
import { TaskRepositoryServiceService } from '../task-repository-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent{

  tasks: Object;

  constructor(private taskRepositoryService: TaskRepositoryServiceService){
    this.tasks = taskRepositoryService.getAllTasks();
  }

  public createTask(): boolean{
    return true;
  }
}
