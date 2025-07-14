import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSideNav } from './app-side-nav';

describe('AppSideNav', () => {
  let component: AppSideNav;
  let fixture: ComponentFixture<AppSideNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSideNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSideNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
