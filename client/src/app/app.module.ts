import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { ScoreboardInputComponent } from './scoreboard-input/scoreboard-input.component';
import { ScoreboardFramesComponent } from './scoreboard-frames/scoreboard-frames.component';
import { ScoreboardFrameComponent } from './scoreboard-frame/scoreboard-frame.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent,
    ScoreboardInputComponent,
    ScoreboardFramesComponent,
    ScoreboardFrameComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
