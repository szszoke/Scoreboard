import { Component, Input, HostBinding } from '@angular/core';
import { IFrameWithScore } from '@app/scoreboard.service';

@Component({
  selector: 'app-scoreboard-frame',
  templateUrl: './scoreboard-frame.component.html',
  styleUrls: ['./scoreboard-frame.component.scss'],
})
export class ScoreboardFrameComponent {
  @Input()
  frame: IFrameWithScore;

  @Input()
  active: boolean;

  @HostBinding('class.tenth')
  @Input()
  tenth: boolean;
}
