import { Component, OnInit } from '@angular/core';
import { ScoreboardService, IFrameWithScore } from '@app/scoreboard.service';

@Component({
  selector: 'app-scoreboard-frames',
  templateUrl: './scoreboard-frames.component.html',
  styleUrls: ['./scoreboard-frames.component.scss'],
})
export class ScoreboardFramesComponent implements OnInit {
  constructor(private scoreboardService: ScoreboardService) {}

  frames: IFrameWithScore[] = [];
  activeFrameIndex = 0;

  ngOnInit() {
    this.getFrames();
    this.getActiveFrameIndex();
  }

  getFrames() {
    this.scoreboardService
      .getFrames()
      .subscribe(frames => (this.frames = frames));
  }

  getActiveFrameIndex() {
    this.scoreboardService
      .getActiveFrameIndex()
      .subscribe(
        activeFrameIndex => (this.activeFrameIndex = activeFrameIndex),
      );
  }
}
