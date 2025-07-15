import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainController } from './main-controller';

describe('MainController', () => {
  let component: MainController;
  let fixture: ComponentFixture<MainController>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainController]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
