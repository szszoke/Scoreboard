import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardInputComponent } from './scoreboard-input.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { ScoreboardService } from '@app/scoreboard.service';

describe('ScoreboardInputComponent', () => {
  let component: ScoreboardInputComponent;
  let fixture: ComponentFixture<ScoreboardInputComponent>;
  let scoreboardService: ScoreboardService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreboardInputComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    scoreboardService = TestBed.get(ScoreboardService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a button for every score', () => {
    expect(fixture.debugElement.queryAll(By.css('button')).length).toBe(
      component.scores.length + 1,
    );
  });

  it('should call onClick when buttons are pressed', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));

    spyOn(scoreboardService, 'roll');

    buttons.forEach((button, index) => {
      (button.nativeElement as HTMLButtonElement).click();
      expect(scoreboardService.roll).toHaveBeenCalledWith(index);
    });
  });

  it('should disable buttons when score invalid', () => {
    spyOn(scoreboardService, 'isValidScore').and.returnValue(false);
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('button:disabled')).length,
    ).toBe(component.scores.length + 1);
  });
});
