import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ScoreboardComponent } from '@app/scoreboard/scoreboard.component';
import { ScoreboardFramesComponent } from '@app/scoreboard-frames/scoreboard-frames.component';
import { ScoreboardInputComponent } from '@app/scoreboard-input/scoreboard-input.component';
import { ScoreboardFrameComponent } from '@app/scoreboard-frame/scoreboard-frame.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ScoreboardComponent,
        ScoreboardFramesComponent,
        ScoreboardFrameComponent,
        ScoreboardInputComponent,
      ],
      imports: [HttpClientModule],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
