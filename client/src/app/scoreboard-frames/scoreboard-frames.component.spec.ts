import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardFramesComponent } from './scoreboard-frames.component';

describe('ScoreboardFramesComponent', () => {
  let component: ScoreboardFramesComponent;
  let fixture: ComponentFixture<ScoreboardFramesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreboardFramesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardFramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
