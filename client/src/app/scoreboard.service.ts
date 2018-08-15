import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IFrame } from '@common/frame';
import { ICalculateScoreResponse } from '@common/calculate-score-response';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

export interface IFrameWithScore extends IFrame {
  score: number | string;
  index: number;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ScoreboardService {
  private readonly totalScoreSubject: BehaviorSubject<number>;
  private readonly framesSubject: BehaviorSubject<IFrameWithScore[]>;
  private readonly frameIndexSubject: BehaviorSubject<number>;
  private readonly gameOverSubject: BehaviorSubject<boolean>;
  private frames: IFrame[] = [];
  private scores: { [key: number]: number };
  private totalScore;
  private frameIndex;
  private rollIndex;
  private lastRoll;
  private readonly rollKeys: (keyof IFrame)[] = ['first', 'second', 'third'];

  constructor(private http: HttpClient) {
    this.reset();

    this.totalScoreSubject = new BehaviorSubject(0);
    this.frameIndexSubject = new BehaviorSubject(0);
    this.framesSubject = new BehaviorSubject<IFrameWithScore[]>(
      this.frames.map((_, index) => this.constructFrame(index)),
    );
    this.gameOverSubject = new BehaviorSubject(false);
  }

  getTotalScore() {
    return this.totalScoreSubject;
  }

  getFrames(): Observable<IFrameWithScore[]> {
    return this.framesSubject;
  }

  getActiveFrameIndex(): Observable<number> {
    return this.frameIndexSubject;
  }

  getGameOver(): Observable<boolean> {
    return this.gameOverSubject;
  }

  roll(score: number) {
    this.lastRoll = score;
    const frame = this.frames[this.frameIndex];
    frame[this.rollKeys[this.rollIndex++]] = score;

    if (
      (this.frameIndex < 9 && score === 10) ||
      (this.frameIndex < 9 && this.rollIndex === 2) ||
      (this.frameIndex === 9 &&
        this.rollIndex === 2 &&
        frame.first + frame.second < 10) ||
      this.rollIndex === 3
    ) {
      this.rollIndex = 0;
      this.lastRoll = 0;
      this.calculateScore(this.frameIndex++);
    }

    this.updateFrames();
  }

  isValidScore(score: number): boolean {
    if (this.frameIndex < 9) {
      return score <= 10 - this.lastRoll;
    } else if (this.frameIndex === 9) {
      const frame = this.frames[this.frameIndex];
      if (this.rollIndex < 2) {
        return frame.first === 10 || score <= 10 - this.lastRoll;
      } else {
        return frame.first + frame.second === 10 || frame.first === 10;
      }
    }

    return false;
  }

  newGame() {
    this.reset();
    this.updateFrames();
    this.totalScoreSubject.next(0);
    this.frameIndexSubject.next(0);
    this.gameOverSubject.next(false);
  }

  private calculateScore(frameIndex: number): void {
    this.http
      .post<ICalculateScoreResponse>('/api/score', this.frames, httpOptions)
      .subscribe(data => {
        this.frameIndexSubject.next(this.frameIndex);
        this.scores[frameIndex] = data.score;
        this.totalScore = Math.max(data.score, this.totalScore);
        this.totalScoreSubject.next(this.totalScore);
        this.updateFrames();

        if (frameIndex === 9) {
          this.gameOverSubject.next(true);
        }
      });
  }

  private updateFrames() {
    this.framesSubject.next(
      this.frames.map((_, index) => this.constructFrame(index)),
    );
  }

  private reset() {
    this.frames = [];
    for (let i = 0; i < 10; ++i) {
      this.frames.push({
        first: undefined,
        second: undefined,
        third: undefined,
      });
    }

    this.scores = {};
    this.totalScore = 0;
    this.frameIndex = 0;
    this.rollIndex = 0;
    this.lastRoll = 0;
  }

  private constructFrame(index: number): IFrameWithScore {
    const frame = this.frames[index];
    let score: number | string = this.scores[index];

    if (frame && index < 9) {
      if (frame.first === 10) {
        score = 'X';
      } else if (frame.first + frame.second === 10) {
        score = '/';
      }
    }

    return {
      ...frame,
      score,
      index,
    };
  }
}
