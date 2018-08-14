import { calculateScore } from './calculate-score';
import { expect } from 'chai';
import 'mocha';
import {
  ONE_STRIKE,
  TWO_STRIKES,
  THREE_STRIKES,
  FOUR_STRIKES,
  ONE_SPARE,
  TWO_SPARES,
  THREE_SPARES,
  FOUR_SPARES,
  STRIKE_AND_SPARE,
  STRIKE_AND_OPEN,
  SPARE_AND_STRIKE,
  TWO_SPARES_IN_ROW,
  SPARE_AND_OPEN,
  FULL_GAME_ALL_SPARES,
  FULL_GAME_ALL_STRIKES,
  FULL_GAME_NINTH_SPARE,
  FULL_GAME_NINTH_OPEN,
} from '@/utils/mocks';

describe('calculateScore', () => {
  describe('strikes in row', () => {
    it('one', () => {
      const score = calculateScore(ONE_STRIKE.frames);

      expect(score).to.equal(ONE_STRIKE.score);
    });

    it('two', () => {
      const score = calculateScore(TWO_STRIKES.frames);

      expect(score).to.equal(TWO_STRIKES.score);
    });

    it('three', () => {
      const score = calculateScore(THREE_STRIKES.frames);

      expect(score).to.equal(THREE_STRIKES.score);
    });

    it('four', () => {
      const score = calculateScore(FOUR_STRIKES.frames);

      expect(score).to.equal(FOUR_STRIKES.score);
    });
  });

  describe('spares in row', () => {
    it('one', () => {
      const score = calculateScore(ONE_SPARE.frames);

      expect(score).to.equal(ONE_SPARE.score);
    });

    it('two', () => {
      const score = calculateScore(TWO_SPARES.frames);

      expect(score).to.equal(TWO_SPARES.score);
    });

    it('three', () => {
      const score = calculateScore(THREE_SPARES.frames);

      expect(score).to.equal(THREE_SPARES.score);
    });

    it('four', () => {
      const score = calculateScore(FOUR_SPARES.frames);

      expect(score).to.equal(FOUR_SPARES.score);
    });
  });

  it('a strike and a spare', () => {
    const score = calculateScore(STRIKE_AND_SPARE.frames);

    expect(score).to.equal(STRIKE_AND_SPARE.score);
  });

  it('a strike and an open', () => {
    const score = calculateScore(STRIKE_AND_OPEN.frames);

    expect(score).to.equal(STRIKE_AND_OPEN.score);
  });

  it('a spare and a strike', () => {
    const score = calculateScore(SPARE_AND_STRIKE.frames);

    expect(score).to.equal(SPARE_AND_STRIKE.score);
  });

  it('two spares in row', () => {
    const score = calculateScore(TWO_SPARES_IN_ROW.frames);

    expect(score).to.equal(TWO_SPARES_IN_ROW.score);
  });

  it('a spare and an open', () => {
    const score = calculateScore(SPARE_AND_OPEN.frames);

    expect(score).to.equal(SPARE_AND_OPEN.score);
  });

  describe('full game', () => {
    it('all spares with bonus roll', () => {
      const score = calculateScore(FULL_GAME_ALL_SPARES.frames);

      expect(score).to.equal(FULL_GAME_ALL_SPARES.score);
    });

    it('all strikes!', () => {
      const score = calculateScore(FULL_GAME_ALL_STRIKES.frames);

      expect(score).to.equal(FULL_GAME_ALL_STRIKES.score);
    });

    it('the ninth is spare', () => {
      const score = calculateScore(FULL_GAME_NINTH_SPARE.frames);

      expect(score).to.equal(FULL_GAME_NINTH_SPARE.score);
    });

    it('the ninth is open', () => {
      const score = calculateScore(FULL_GAME_NINTH_OPEN.frames);

      expect(score).to.equal(FULL_GAME_NINTH_OPEN.score);
    });
  });
});
