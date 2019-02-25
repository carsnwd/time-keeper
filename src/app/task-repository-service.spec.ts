import { TestBed } from '@angular/core/testing';

import { TaskRepositoryService } from './task-repository.service';
import { Task } from './models/task';
import { TaskFactoryService } from './task-factory-service';

describe('TaskRepositoryService', () => {
  let service: TaskRepositoryService;
  let taskFactoryService: TaskFactoryService;
  let task: Task;
  const LOCALSTORAGE_KEY = 'timeKeeperTasks';

  // mock local storage
  beforeEach(() => {
    const store = {};
    spyOn(localStorage, 'getItem').and.callFake(key => {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      return store[key] = value + '';
    });
  });

  // setup mock tasks and task factory
  beforeEach(() => {
    taskFactoryService = new TaskFactoryService();
    task = taskFactoryService.createTask({
      name: 'My Task',
      startTime: 1449848371868,
      endTime: 1549848371868
    });
  });

  beforeEach(() => {
    service = new TaskRepositoryService(taskFactoryService);
  });

  it('should add a task', () => {
    const result = service.addTask(task);
    expect(result).toBeTruthy();
    const expectedTask = {};
    expectedTask[task.id] = task;
    expect(localStorage.setItem).toHaveBeenCalledWith(LOCALSTORAGE_KEY, JSON.stringify(expectedTask));
  });

  it('should update a task', () => {
    service.addTask(task);
    const updatedTask = task;
    updatedTask.name = 'new name new me';
    const result = service.updateTask(updatedTask);
    const expectedTask = {};
    expectedTask[updatedTask.id] = updatedTask;
    expect(result).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith(LOCALSTORAGE_KEY, JSON.stringify(expectedTask));
  });

  it('should get all tasks', () => {
    service.addTask(task);
    const tasks = service.getAllTasks();
    const expectedTasks = {};
    expectedTasks[task.id] = task;
    expect(tasks).toEqual(expectedTasks);
  });

  it('should remove a task', () => {
    service.addTask(task);
    let tasks = service.getAllTasks();
    const expectedTasks = {};
    expectedTasks[task.id] = task;
    expect(tasks).toEqual(expectedTasks);
    const result = service.removeTask(task);
    expect(result).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith(LOCALSTORAGE_KEY, JSON.stringify({}));
    tasks = service.getAllTasks();
    expect(tasks).toEqual({});
  });

  describe('should return false if no task found with id', () => {
    let taskNotInRepo: Task;
    beforeEach(() => {
      taskNotInRepo = taskFactoryService.createTask({
        name: 'I dont exist',
        startTime: 1449848371868,
        endTime: 1549848371868
      });
    });
    it('when removing a task', () => {
      const result = service.removeTask(taskNotInRepo);
      expect(result).toBeFalsy();
    });

    it('when updating a task', () => {
      const result = service.updateTask(taskNotInRepo);
      expect(result).toBeFalsy();
    });
  })
});
