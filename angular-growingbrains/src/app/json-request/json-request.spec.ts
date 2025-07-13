import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonRequest } from './json-request';

describe('JsonRequest', () => {
  let component: JsonRequest;
  let fixture: ComponentFixture<JsonRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
