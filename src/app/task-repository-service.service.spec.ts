import { TestBed } from '@angular/core/testing';

import { TaskRepositoryServiceService } from './task-repository-service.service';

describe('TaskRepositoryServiceService', () => {
  let service: TaskRepositoryServiceService;
  beforeEach(() => {
    service = new TaskRepositoryServiceService();
  });

  //todo mock local storage (?)
  //todo mock a task

  it('should add a task', () => {

  });

  it('should update a task', () =>{

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
