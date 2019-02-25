import { TestBed } from '@angular/core/testing';

import { TaskFactoryService } from './task-factory-service';

describe('TaskFactoryService', () => {
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

  it('createTask - should error if missing param', () => {
    expect(() => service.createTask({
      name: 'Erm'
    })).toThrow();
  });
});
