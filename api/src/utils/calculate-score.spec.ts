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
      const score = calculateScore(ONE_STRIKE);

      expect(score).to.equal(10);
    });

    it('two', () => {
      const score = calculateScore(TWO_STRIKES);

      expect(score).to.equal(30);
    });

    it('three', () => {
      const score = calculateScore(THREE_STRIKES);

      expect(score).to.equal(60);
    });

    it('four', () => {
      const score = calculateScore(FOUR_STRIKES);

      expect(score).to.equal(90);
    });
  });

  describe('spares in row', () => {
    it('one', () => {
      const score = calculateScore(ONE_SPARE);

      expect(score).to.equal(10);
    });

    it('two', () => {
      const score = calculateScore(TWO_SPARES);

      expect(score).to.equal(22);
    });

    it('three', () => {
      const score = calculateScore(THREE_SPARES);

      expect(score).to.equal(42);
    });

    it('four', () => {
      const score = calculateScore(FOUR_SPARES);

      expect(score).to.equal(49);
    });
  });

  it('a strike and a spare', () => {
    const score = calculateScore(STRIKE_AND_SPARE);

    expect(score).to.equal(30);
  });

  it('a strike and an open', () => {
    const score = calculateScore(STRIKE_AND_OPEN);

    expect(score).to.equal(18);
  });

  it('a spare and a strike', () => {
    const score = calculateScore(SPARE_AND_STRIKE);

    expect(score).to.equal(30);
  });

  it('two spares in row', () => {
    const score = calculateScore(TWO_SPARES_IN_ROW);

    expect(score).to.equal(21);
  });

  it('a spare and an open', () => {
    const score = calculateScore(SPARE_AND_OPEN);

    expect(score).to.equal(17);
  });

  describe('full game', () => {
    it('all spares with bonus roll', () => {
      const score = calculateScore(FULL_GAME_ALL_SPARES);

      expect(score).to.equal(147);
    });

    it('all strikes!', () => {
      const score = calculateScore(FULL_GAME_ALL_STRIKES);

      expect(score).to.equal(300);
    });

    it('the ninth is spare', () => {
      const score = calculateScore(FULL_GAME_NINTH_SPARE);

      expect(score).to.equal(277);
    });

    it('the ninth is open', () => {
      const score = calculateScore(FULL_GAME_NINTH_OPEN);

      expect(score).to.equal(264);
    });
  });
});
