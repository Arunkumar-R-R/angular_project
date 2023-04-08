import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStatisticsComponent } from './job-statistics.component';

describe('JobStatisticsComponent', () => {
  let component: JobStatisticsComponent;
  let fixture: ComponentFixture<JobStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
