import { TestBed } from '@angular/core/testing';

import { TaskFactoryServiceService } from './task-factory-service.service';

describe('TaskFactoryServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskFactoryServiceService = TestBed.get(TaskFactoryServiceService);
    expect(service).toBeTruthy();
  });

  it('createTask - should create a new task', () => {

  });

  it('createTask - should error if missing param', () => {

  });
});
