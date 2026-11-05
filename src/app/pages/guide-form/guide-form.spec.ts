import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuideForm } from './guide-form';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('GuideForm', () => {
  let component: GuideForm;
  let fixture: ComponentFixture<GuideForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideForm],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GuideForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
