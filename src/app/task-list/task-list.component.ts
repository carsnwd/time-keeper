import { Component, OnInit } from '@angular/core';
import { TaskRepositoryServiceService } from '../task-repository-service.service';
import { Task } from '../models/task';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent{

  tasks: Object;

  constructor(private taskRepositoryService: TaskRepositoryServiceService, private createTaskDialog: MatDialog){
    this.tasks = taskRepositoryService.getAllTasks();
  }

  public createTask(): boolean{
    return true;
  }

  public updateTask(): boolean{
    return true;
  }

  public removeTask(): boolean{
    return true;
  }

  public startTask(task: Task): boolean{
    return true;
  }

  public stopTask(task: Task): boolean{
    return true;
  }

  public getTotalTime(): number{
    return 0;
  }

  public openCreateTaskDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.createTaskDialog.open(TaskDialogComponent, dialogConfig);
  }
}
