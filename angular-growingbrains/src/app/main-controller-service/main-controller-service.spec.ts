import { TestBed } from '@angular/core/testing';

import { MainControllerService } from './main-controller-service';

describe('MainControllerService', () => {
  let service: MainControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
