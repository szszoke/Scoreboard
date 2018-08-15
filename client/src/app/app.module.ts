import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { ScoreboardInputComponent } from './scoreboard-input/scoreboard-input.component';
import { ScoreboardFramesComponent } from './scoreboard-frames/scoreboard-frames.component';
import { ValidateScoresDirective } from './validate-scores.directive';
import { ScoreboardFrameComponent } from './scoreboard-frame/scoreboard-frame.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent,
    ScoreboardInputComponent,
    ScoreboardFramesComponent,
    ValidateScoresDirective,
    ScoreboardFrameComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
