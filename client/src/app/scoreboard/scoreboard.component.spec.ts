import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardComponent } from './scoreboard.component';
import { ScoreboardFramesComponent } from '@app/scoreboard-frames/scoreboard-frames.component';
import { ScoreboardFrameComponent } from '@app/scoreboard-frame/scoreboard-frame.component';
import { ScoreboardInputComponent } from '@app/scoreboard-input/scoreboard-input.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { ScoreboardService } from '@app/scoreboard.service';
import { of } from 'rxjs';

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;
  let scoreboardService: ScoreboardService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScoreboardComponent,
        ScoreboardFramesComponent,
        ScoreboardFrameComponent,
        ScoreboardInputComponent,
      ],
      imports: [HttpClientModule],
      providers: [ScoreboardService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    scoreboardService = TestBed.get(ScoreboardService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render total score 0', () => {
    expect(
      fixture.debugElement.query(By.css('.total-score')).nativeElement
        .textContent,
    ).toContain('Total score: 0');
  });

  describe('score changes', () => {
    beforeEach(() => {
      spyOn(scoreboardService, 'getTotalScore').and.returnValue(of(10));
      fixture.detectChanges();
    });

    it('should display the new score', () => {
      expect(
        fixture.debugElement.query(By.css('.total-score')).nativeElement
          .textContent,
      ).toEqual('Total score: 10');
    });
  });

  it('should not render game over message', () => {
    expect(fixture.debugElement.query(By.css('.game-over'))).toBeFalsy();
  });

  it(`should call 'scoreboardService.newGame' when 'New game' pressed`, () => {
    spyOn(scoreboardService, 'newGame');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.button-wrapper button'))
      .nativeElement as HTMLButtonElement;

    button.click();
    expect(scoreboardService.newGame).toHaveBeenCalled();
  });

  describe('game over', () => {
    beforeEach(() => {
      spyOn(scoreboardService, 'getGameOver').and.returnValue(of(true));
      fixture.detectChanges();
    });

    it(`should display 'game over' message`, () => {
      expect(fixture.debugElement.query(By.css('.game-over'))).toBeTruthy();
    });
  });
});
