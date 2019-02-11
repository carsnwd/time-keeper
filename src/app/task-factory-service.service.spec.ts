import { TestBed } from '@angular/core/testing';

import { TaskFactoryServiceService } from './task-factory-service.service';

describe('TaskFactoryServiceService', () => {
  let service: TaskFactoryServiceService;
  beforeEach(() => {
    service = new TaskFactoryServiceService();
  });

  it('createTask - should create a new task', () => {
    const task = service.createTask({
      name: "My Task",
      color: "#FFFFFF",
      startTime: new Date(1449848371868),
      endTime: new Date(1549848371868)
    });
    expect(task.name).toEqual("My Task");
    expect(task.id).toBeDefined();
    expect(task.color).toEqual("#FFFFFF");
    expect(task.startTime).toEqual(new Date(1449848371868));
    expect(task.endTime).toEqual(new Date(1549848371868));
  });

  it('createTask - should error if missing param', () => {
    expect(()=>service.createTask({
      name: "Erm"
    })).toThrow();
  });
});
