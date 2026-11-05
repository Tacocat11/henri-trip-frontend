import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuideDetail } from './guide-detail';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('GuideDetail', () => {
  let component: GuideDetail;
  let fixture: ComponentFixture<GuideDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideDetail],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GuideDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
