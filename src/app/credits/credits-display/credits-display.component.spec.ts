import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsDisplayComponent } from './credits-display.component';

describe('CreditsDisplayComponent', () => {
  let component: CreditsDisplayComponent;
  let fixture: ComponentFixture<CreditsDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditsDisplayComponent]
    });
    fixture = TestBed.createComponent(CreditsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
