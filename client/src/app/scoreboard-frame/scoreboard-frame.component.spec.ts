import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardFrameComponent } from './scoreboard-frame.component';

describe('ScoreboardFrameComponent', () => {
  let component: ScoreboardFrameComponent;
  let fixture: ComponentFixture<ScoreboardFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreboardFrameComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
