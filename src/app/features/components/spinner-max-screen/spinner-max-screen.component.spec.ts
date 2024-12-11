import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerMaxScreenComponent } from './spinner-max-screen.component';

describe('SpinnerMaxScreenComponent', () => {
  let component: SpinnerMaxScreenComponent;
  let fixture: ComponentFixture<SpinnerMaxScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerMaxScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerMaxScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
