import { TestBed } from '@angular/core/testing';

import { TaskRepositoryServiceService } from './task-repository-service.service';
import { Task } from './models/task';
import { TaskFactoryServiceService } from './task-factory-service.service';

describe('TaskRepositoryServiceService', () => {
  let service: TaskRepositoryServiceService;
  let taskFactoryService: TaskFactoryServiceService;
  let task: Task;
  const LOCALSTORAGE_KEY = "timeKeeperTasks";

  //mock local storage
  beforeEach(() => {
    let store = {};
    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });
  });

  //setup mock tasks and task factory
  beforeEach(() => {
    taskFactoryService = new TaskFactoryServiceService();
    task = taskFactoryService.createTask({
      name: "My Task",
      color: "#FFFFFF",
      startTime: new Date(1449848371868),
      endTime: new Date(1549848371868)
    });
  });

  beforeEach(() => {
    service = new TaskRepositoryServiceService();
  });

  it('should add a task', () => {
    const result = service.addTask(task);
    expect(result).toBeTruthy();
    let expectedTask = {};
    expectedTask[task.id] = task;
    expect(localStorage.setItem).toHaveBeenCalledWith(LOCALSTORAGE_KEY, JSON.stringify(expectedTask));
  });

  it('should update a task', () =>{
    service.addTask(task);
    let updatedTask = task;
    updatedTask.name = "new name new me";
    const result = service.updateTask(updatedTask);
    let expectedTask = {};
    expectedTask[updatedTask.id] = updatedTask;
    expect(result).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith(LOCALSTORAGE_KEY, JSON.stringify(expectedTask));
  });

  it('should remove a task', () =>{

  });

  it('should get all tasks', () =>{

  });

  describe('should return false if no task found with id', () => {
    it('when removing a task', () =>{

    });

    it('when updating a task', ()=>{

    });

    it('when adding a task', ()=>{

    });
  })
});
