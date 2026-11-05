import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuideActivities } from './guide-activities';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('GuideActivities', () => {
  let component: GuideActivities;
  let fixture: ComponentFixture<GuideActivities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideActivities],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GuideActivities);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
