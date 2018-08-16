import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardFramesComponent } from './scoreboard-frames.component';
import { ScoreboardFrameComponent } from '@app/scoreboard-frame/scoreboard-frame.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('ScoreboardFramesComponent', () => {
  let component: ScoreboardFramesComponent;
  let fixture: ComponentFixture<ScoreboardFramesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreboardFramesComponent, ScoreboardFrameComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardFramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 10 scoreboard frames', () => {
    expect(
      fixture.debugElement.queryAll(By.directive(ScoreboardFrameComponent))
        .length,
    ).toBe(10);
  });
});
