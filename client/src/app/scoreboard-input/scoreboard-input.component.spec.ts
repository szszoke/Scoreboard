import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardInputComponent } from './scoreboard-input.component';

describe('ScoreboardInputComponent', () => {
  let component: ScoreboardInputComponent;
  let fixture: ComponentFixture<ScoreboardInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreboardInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
