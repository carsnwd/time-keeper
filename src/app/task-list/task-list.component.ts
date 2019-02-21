import { Component, OnInit } from '@angular/core';
import { TaskRepositoryServiceService } from '../task-repository-service.service';
import { TaskFactoryService } from '../task-factory-service';
import { Task } from '../models/task';
import { MatDialog } from "@angular/material";
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent{

  tasks: Object;

  constructor(private taskRepositoryService: TaskRepositoryServiceService, private taskFactoryService: TaskFactoryService, private createTaskDialog: MatDialog){
    this.tasks = taskRepositoryService.getAllTasks();
  }

  public createTask(task): boolean{
    const taskObject = this.taskFactoryService.createTask({
      name: task.name,
      color: task.color
    });
    this.taskRepositoryService.addTask(taskObject);
    return true;
  }

  public updateTask(): boolean{
    return true;
  }

  public removeTask(taskObject): boolean{
    const task = taskObject as Task;
    return this.taskRepositoryService.removeTask(task);
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
    let dialogRef = this.createTaskDialog.open(TaskDialogComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if(data){
        this.createTask(data);
      }
    });
  }
}
