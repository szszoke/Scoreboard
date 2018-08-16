import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ONE_SPARE,
  ONE_STRIKE,
  FULL_GAME_ALL_STRIKES_LAST_TWO_OPEN,
  FULL_GAME_ALL_STRIKES,
} from '@common/mocks';

import { ScoreboardService } from './scoreboard.service';
import { combineLatest } from 'rxjs';

describe('ScoreboardService', () => {
  let service: ScoreboardService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScoreboardService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(ScoreboardService);
    testingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initially', () => {
    it('#getToalScore should return 0', done => {
      service.getTotalScore().subscribe(totalScore => {
        expect(totalScore).toBe(0);
        done();
      });
    });

    it('#getFrames should return 10 empty frames', done => {
      service.getFrames().subscribe(frames => {
        expect(frames).toBeTruthy();
        expect(frames.length).toBe(10);
        frames.forEach((frame, index) => {
          expect(frame).toBeTruthy();
          const { index: frameIndex, ...rest } = frame;
          expect(rest).toEqual({
            first: undefined,
            second: undefined,
            third: undefined,
            score: undefined,
          });
          expect(frameIndex).toBe(index);
        });
        done();
      });
    });

    it('#getActiveFrameIndex should return 0', done => {
      service.getActiveFrameIndex().subscribe(frameIndex => {
        expect(frameIndex).toBe(0);
        done();
      });
    });

    it('#getGameOver should return false', done => {
      service.getGameOver().subscribe(gameOver => {
        expect(gameOver).toBeFalsy();
        done();
      });
    });
  });

  describe('roll a spare', () => {
    it('calling roll once should update the first frame', done => {
      service.roll(ONE_SPARE.frames[0].first);
      service.getFrames().subscribe(frames => {
        expect(frames[0].first).toBe(ONE_SPARE.frames[0].first);
        done();
      });
    });

    it('isValidScore should return true for valid scores', () => {
      service.roll(ONE_SPARE.frames[0].first);
      const scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const validScores: number[] = [];
      for (let i = 0; i <= 10 - ONE_SPARE.frames[0].first; ++i) {
        validScores.push(i);
      }

      expect(scores.filter(score => service.isValidScore(score))).toEqual(
        validScores,
      );
    });

    describe('when calling roll twice', () => {
      it('should call calculateScore', () => {
        spyOn<any>(service, 'calculateScore');
        service.roll(ONE_SPARE.frames[0].first);
        service.roll(ONE_SPARE.frames[0].second);
        expect((service as any).calculateScore).toHaveBeenCalledWith(0);
      });

      it('should update the frame index', done => {
        service.roll(ONE_SPARE.frames[0].first);
        service.roll(ONE_SPARE.frames[0].second);

        service.getActiveFrameIndex().subscribe(frameIndex => {
          // skip default value
          if (frameIndex !== 0) {
            expect(frameIndex).toBe(1);
            done();
          }
        });

        const req = testingController.expectOne('/api/score');
        expect(req.request.method).toBe('POST');

        req.flush({
          scores: ONE_SPARE.scores,
          totalScore: ONE_SPARE.scores[0],
        });
      });

      it('should update the first frame', done => {
        service.roll(ONE_SPARE.frames[0].first);
        service.roll(ONE_SPARE.frames[0].second);
        service.getFrames().subscribe(frames => {
          expect(frames[0].first).toBe(ONE_SPARE.frames[0].first);
          expect(frames[0].second).toBe(ONE_SPARE.frames[0].second);
          done();
        });
      });
    });
  });

  describe('roll a strike', () => {
    it('calling roll once should update the first frame', done => {
      service.roll(ONE_STRIKE.frames[0].first);
      service.getFrames().subscribe(frames => {
        expect(frames[0].first).toBe(ONE_STRIKE.frames[0].first);
        done();
      });
    });

    it('calling roll once should update the frame index', done => {
      service.roll(ONE_STRIKE.frames[0].first);

      service.getActiveFrameIndex().subscribe(frameIndex => {
        // skip default value
        if (frameIndex !== 0) {
          expect(frameIndex).toBe(1);
          done();
        }
      });

      const req = testingController.expectOne('/api/score');
      expect(req.request.method).toBe('POST');

      req.flush({
        scores: ONE_SPARE.scores,
        totalScore: ONE_SPARE.scores[0],
      });
    });

    it('calling roll twice should post the score to the backend', done => {
      service.roll(ONE_STRIKE.frames[0].first);
      service.getFrames().subscribe(frames => {
        const frame = frames[0];

        if (frame.score) {
          expect(frame.score).toBe(ONE_STRIKE.scores[0]);
          done();
        }
      });

      const req = testingController.expectOne('/api/score');
      expect(req.request.method).toBe('POST');

      req.flush({
        scores: ONE_SPARE.scores,
        totalScore: ONE_SPARE.scores[0],
      });

      testingController.verify();
    });
  });

  describe('last frame is played', () => {
    describe('first two rolls are open', () => {
      it('should call calculateScore after the two rolls', () => {
        FULL_GAME_ALL_STRIKES_LAST_TWO_OPEN.frames
          .slice(0, 9)
          .forEach(frame => service.roll(frame.first));

        spyOn<any>(service, 'calculateScore');

        const lastFrame = FULL_GAME_ALL_STRIKES_LAST_TWO_OPEN.frames[9];
        service.roll(lastFrame.first);
        service.roll(lastFrame.second);
        expect((service as any).calculateScore).toHaveBeenCalledWith(9);
      });
    });

    describe('first roll is strike', () => {
      it('isValidScore should allow every score', () => {
        FULL_GAME_ALL_STRIKES.frames
          .slice(0, 9)
          .forEach(frame => service.roll(frame.first));

        service.roll(10);
        const scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(scores.filter(score => service.isValidScore(score))).toEqual(
          scores,
        );
      });
    });

    describe('first roll is not strike', () => {
      it('isValidScore should not allow every score', () => {
        FULL_GAME_ALL_STRIKES.frames
          .slice(0, 9)
          .forEach(frame => service.roll(frame.first));

        service.roll(4);
        const scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(scores.filter(score => service.isValidScore(score))).toEqual([
          0,
          1,
          2,
          3,
          4,
          5,
          6,
        ]);
      });
    });

    describe('first two rolls are strikes', () => {
      it('should call calculateScore after the three rolls', () => {
        FULL_GAME_ALL_STRIKES.frames
          .slice(0, 9)
          .forEach(frame => service.roll(frame.first));

        spyOn<any>(service, 'calculateScore');

        const lastFrame = FULL_GAME_ALL_STRIKES.frames[9];
        service.roll(lastFrame.first);
        service.roll(lastFrame.second);
        service.roll(lastFrame.third);
        expect((service as any).calculateScore).toHaveBeenCalledWith(9);
      });
    });

    describe('first two rolls are spares', () => {
      it('isValidScore should allow every score', () => {
        FULL_GAME_ALL_STRIKES.frames
          .slice(0, 9)
          .forEach(frame => service.roll(frame.first));

        service.roll(1);
        service.roll(9);
        const scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(scores.filter(score => service.isValidScore(score))).toEqual(
          scores,
        );
      });
    });

    describe('first is stike second is zero', () => {
      it('isValidScore should allow every score', () => {
        FULL_GAME_ALL_STRIKES.frames
          .slice(0, 9)
          .forEach(frame => service.roll(frame.first));

        service.roll(10);
        service.roll(0);
        const scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(scores.filter(score => service.isValidScore(score))).toEqual(
          scores,
        );
      });
    });

    describe('first is stike second is open', () => {
      it('isValidScore should allow every score', () => {
        FULL_GAME_ALL_STRIKES.frames
          .slice(0, 9)
          .forEach(frame => service.roll(frame.first));

        service.roll(10);
        service.roll(4);
        const scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(scores.filter(score => service.isValidScore(score))).toEqual(
          scores,
        );
      });
    });

    describe('last roll played', () => {
      it('should set game over to true', done => {
        FULL_GAME_ALL_STRIKES.frames
          .slice(0, 9)
          .forEach(frame => service.roll(frame.first));
        service.roll(10);
        service.roll(10);
        service.roll(10);

        service.getGameOver().subscribe(gameOver => {
          if (gameOver) {
            done();
          }
        });

        const reqs = testingController.match('/api/score');

        reqs.forEach(req =>
          req.flush({
            scores: [],
            totalScore: 0,
          }),
        );

        testingController.verify();
      });
    });
  });

  it('calling newGame should reset everything', done => {
    FULL_GAME_ALL_STRIKES.frames
      .slice(0, 9)
      .forEach(frame => service.roll(frame.first));
    service.roll(10);
    service.roll(10);
    service.roll(10);

    service.getGameOver().subscribe(gameOver => gameOver && service.newGame());

    const reqs = testingController.match('/api/score');

    reqs.forEach(req =>
      req.flush({
        scores: FULL_GAME_ALL_STRIKES.scores,
        totalScore: 300,
      }),
    );

    combineLatest<any>([
      service.getTotalScore(),
      service.getFrames(),
      service.getActiveFrameIndex(),
      service.getGameOver(),
    ]).subscribe(results => {
      const [totalScore, frames, activeIndex, gameOver] = results;

      expect(totalScore).toBe(0);

      expect(frames).toBeTruthy();
      expect(frames.length).toBe(10);
      frames.forEach((frame, index) => {
        expect(frame).toBeTruthy();
        const { index: frameIndex, ...rest } = frame;
        expect(rest).toEqual({
          first: undefined,
          second: undefined,
          third: undefined,
          score: undefined,
        });
        expect(frameIndex).toBe(index);
      });

      expect(activeIndex).toBe(0), expect(gameOver).toBe(false);
      done();
    });

    testingController.verify();
  });
});
