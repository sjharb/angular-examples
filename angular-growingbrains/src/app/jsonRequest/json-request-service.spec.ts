import { TestBed } from '@angular/core/testing';

import { JsonRequestService } from './json-request-service';

describe('JsonRequestService', () => {
  let service: JsonRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
