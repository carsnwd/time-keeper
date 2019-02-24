import { Component, Pipe, PipeTransform, OnInit, OnDestroy } from '@angular/core';
import { TaskRepositoryServiceService } from '../task-repository-service.service';
import { TaskFactoryService } from '../task-factory-service';
import { Task } from '../models/task';
import { MatDialog } from '@angular/material';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import * as _ from 'lodash';
import { Observable, timer } from 'rxjs';
import { TimeFormatPipe } from '../time-format.pipe';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less'],
  providers: [TimeFormatPipe]
})
export class TaskListComponent implements OnInit {
  tasks: object;
  taskUpdater: Observable<number>;
  totalTime: number;

  constructor(
    private taskRepositoryService: TaskRepositoryServiceService,
    private taskFactoryService: TaskFactoryService,
    private taskInputDialog: MatDialog) {
    this.tasks = taskRepositoryService.getAllTasks();
    this.totalTime = 0;
  }

  ngOnInit(): void {
    this.taskUpdater = timer(1000, 1000);
    this.taskUpdater.subscribe(tick => {
      this.calculateTaskRunTimes();
    });
  }

  private calculateTaskRunTimes(): void {
    this.totalTime = 0;
    _.forEach(this.tasks, (task: Task) => {
      if (task.isActive) {
          task.runningTime = (Date.now() - task.startTime) + task.previousRunningTime;
      } else {
        task.runningTime = task.previousRunningTime;
      }
      this.totalTime = task.runningTime + this.totalTime;
      this.taskRepositoryService.updateTask(task);
    });
  }

  public createTask(task: { name: string; color: string; }): boolean {
    const taskObject = this.taskFactoryService.createTask({
      name: task.name
    });
    this.taskRepositoryService.addTask(taskObject);
    return true;
  }

  public updateTask(task: Task): void {
    const dialogRef = this.taskInputDialog.open(TaskDialogComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        task.name = data.name;
        this.taskRepositoryService.updateTask(task);
      }
    });
  }

  public removeTask(task: Task): boolean {
    return this.taskRepositoryService.removeTask(task);
  }

  public startTask(task: Task): void {
    task = this.taskFactoryService.cloneTaskObjectToTaskClass(task);
    task.startTime = Date.now();
    task.isActive = true;
    this.taskRepositoryService.updateTask(task);
  }

  public stopTask(task: Task): void {
    task = this.taskFactoryService.cloneTaskObjectToTaskClass(task);
    task.endTime = Date.now();
    task.isActive = false;
    task.previousRunningTime = task.runningTime;
    this.taskRepositoryService.updateTask(task);
  }

  public resetTask(task: Task): void {
    task = this.taskFactoryService.cloneTaskObjectToTaskClass(task);
    task.startTime = Date.now();
    task.endTime = Date.now();
    task.isActive = false;
    task.previousRunningTime = 0;
    task.runningTime = 0;
    this.taskRepositoryService.updateTask(task);
  }

  public openTaskInputDialog(): void {
    const dialogRef = this.taskInputDialog.open(TaskDialogComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.createTask(data);
      }
    });
  }

  public openTaskUpdateDialog(): void {
    const dialogRef = this.taskInputDialog.open(TaskDialogComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.updateTask(data);
      }
    });
  }
}