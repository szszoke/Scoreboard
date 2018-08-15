import { Component, OnInit } from '@angular/core';
import { ScoreboardService } from '../scoreboard.service';

@Component({
  selector: 'app-scoreboard-input',
  templateUrl: './scoreboard-input.component.html',
  styleUrls: ['./scoreboard-input.component.scss'],
})
export class ScoreboardInputComponent implements OnInit {
  constructor(public scoreboardService: ScoreboardService) {}

  scores: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  ngOnInit() {}

  onClick(score: number) {
    this.scoreboardService.roll(score);
  }
}
