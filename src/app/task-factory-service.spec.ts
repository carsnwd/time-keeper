import { TestBed } from '@angular/core/testing';

import { TaskFactoryService } from './task-factory-service';
import { Task } from './models/task';

fdescribe('TaskFactoryService', () => {
  let service: TaskFactoryService;
  beforeEach(() => {
    service = new TaskFactoryService();
  });

  it('createTask - should create a new task', () => {
    const task = service.createTask({
      name: 'My Task',
      startTime: 1449848371868,
      endTime: 1549848371868
    });
    expect(task.name).toEqual('My Task');
    expect(task.id).toBeDefined();
    expect(task.startTime).toEqual(1449848371868);
    expect(task.endTime).toEqual(1549848371868);
  });

  it('createTask - should error if missing name', () => {
    expect(() => service.createTask({
      name: undefined
    })).toThrow();
  });

  it('cloneTaskObjectToTaskClass - should clone object to Task model', () => {
    const taskObject = {
      _id: 1234,
      _name: 'abcd',
      _startTime: 1,
      _endTime: 2,
      _isActive: false,
      _runningTime: 1,
      _previousRunningTime: 1
    };
    let task: Task;
    task = service.cloneTaskObjectToTaskClass(taskObject);
    expect(task instanceof Task).toBeTruthy();
    expect(task.name).toEqual('abcd');
    expect(task.id).toEqual(1234);
    expect(task.startTime).toEqual(1);
    expect(task.endTime).toEqual(2);
    expect(task.isActive).toEqual(false);
    expect(task.runningTime).toEqual(1);
    expect(task.previousRunningTime).toEqual(1);
  });

  it('cloneTaskObjectToTaskClass - should throw if invalid task object', () => {
    expect(() => {
      service.cloneTaskObjectToTaskClass({
        name: undefined
      });
    }).toThrow();
  });
});
