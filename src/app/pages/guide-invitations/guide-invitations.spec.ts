import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuideInvitations } from './guide-invitations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('GuideInvitations', () => {
  let component: GuideInvitations;
  let fixture: ComponentFixture<GuideInvitations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideInvitations],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GuideInvitations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
