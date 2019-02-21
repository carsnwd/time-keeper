import { Component, OnInit } from '@angular/core';
import { TaskRepositoryServiceService } from '../task-repository-service.service';
import { TaskFactoryService } from '../task-factory-service';
import { Task } from '../models/task';
import { MatDialog } from '@angular/material';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent {

  tasks: object;

  constructor(
    private taskRepositoryService: TaskRepositoryServiceService,
    private taskFactoryService: TaskFactoryService,
    private taskInputDialog: MatDialog) {
    this.tasks = taskRepositoryService.getAllTasks();
  }

  public createTask(task: { name: string; color: string; }): boolean {
    const taskObject = this.taskFactoryService.createTask({
      name: task.name,
      color: task.color
    });
    this.taskRepositoryService.addTask(taskObject);
    return true;
  }

  public updateTask(task: Task): void {
    const dialogRef = this.taskInputDialog.open(TaskDialogComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        task.color = data.color;
        task.name = data.name;
        this.taskRepositoryService.updateTask(task);
      }
    });
  }

  public removeTask(task: Task): boolean {
    return this.taskRepositoryService.removeTask(task);
  }

  public startTask(task: Task): boolean {
    return true;
  }

  public stopTask(task: Task): boolean {
    return true;
  }

  public resetTask(task: Task): boolean {
    return true;
  }

  public getTotalTime(): number {
    return 0;
  }

  public openTaskInputDialog(): void {
    const dialogRef = this.taskInputDialog.open(TaskDialogComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.createTask(data);
      }
    });
  }
}
