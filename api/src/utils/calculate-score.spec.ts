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

      expect(score).to.deep.equal(ONE_STRIKE.scores);
    });

    it('two', () => {
      const score = calculateScore(TWO_STRIKES.frames);

      expect(score).to.deep.equal(TWO_STRIKES.scores);
    });

    it('three', () => {
      const score = calculateScore(THREE_STRIKES.frames);

      expect(score).to.deep.equal(THREE_STRIKES.scores);
    });

    it('four', () => {
      const score = calculateScore(FOUR_STRIKES.frames);

      expect(score).to.deep.equal(FOUR_STRIKES.scores);
    });
  });

  describe('spares in row', () => {
    it('one', () => {
      const score = calculateScore(ONE_SPARE.frames);

      expect(score).to.deep.equal(ONE_SPARE.scores);
    });

    it('two', () => {
      const score = calculateScore(TWO_SPARES.frames);

      expect(score).to.deep.equal(TWO_SPARES.scores);
    });

    it('three', () => {
      const score = calculateScore(THREE_SPARES.frames);

      expect(score).to.deep.equal(THREE_SPARES.scores);
    });

    it('four', () => {
      const score = calculateScore(FOUR_SPARES.frames);

      expect(score).to.deep.equal(FOUR_SPARES.scores);
    });
  });

  it('a strike and a spare', () => {
    const score = calculateScore(STRIKE_AND_SPARE.frames);

    expect(score).to.deep.equal(STRIKE_AND_SPARE.scores);
  });

  it('a strike and an open', () => {
    const score = calculateScore(STRIKE_AND_OPEN.frames);

    expect(score).to.deep.equal(STRIKE_AND_OPEN.scores);
  });

  it('a spare and a strike', () => {
    const score = calculateScore(SPARE_AND_STRIKE.frames);

    expect(score).to.deep.equal(SPARE_AND_STRIKE.scores);
  });

  it('two spares in row', () => {
    const score = calculateScore(TWO_SPARES_IN_ROW.frames);

    expect(score).to.deep.equal(TWO_SPARES_IN_ROW.scores);
  });

  it('a spare and an open', () => {
    const score = calculateScore(SPARE_AND_OPEN.frames);

    expect(score).to.deep.equal(SPARE_AND_OPEN.scores);
  });

  describe('full game', () => {
    it('all spares with bonus roll', () => {
      const score = calculateScore(FULL_GAME_ALL_SPARES.frames);

      expect(score).to.deep.equal(FULL_GAME_ALL_SPARES.scores);
    });

    it('all strikes!', () => {
      const score = calculateScore(FULL_GAME_ALL_STRIKES.frames);

      expect(score).to.deep.equal(FULL_GAME_ALL_STRIKES.scores);
    });

    it('the ninth is spare', () => {
      const score = calculateScore(FULL_GAME_NINTH_SPARE.frames);

      expect(score).to.deep.equal(FULL_GAME_NINTH_SPARE.scores);
    });

    it('the ninth is open', () => {
      const score = calculateScore(FULL_GAME_NINTH_OPEN.frames);

      expect(score).to.deep.equal(FULL_GAME_NINTH_OPEN.scores);
    });
  });
});
