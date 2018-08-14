import { calculateScore } from './calculate-score';
import { expect } from 'chai';
import 'mocha';

describe('calculateScore', () => {
  describe('strikes in row', () => {
    it('one', () => {
      const score = calculateScore([
        {
          first: 10,
          second: 0,
        },
      ]);

      expect(score).to.equal(10);
    });

    it('two', () => {
      const score = calculateScore([
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
      ]);

      expect(score).to.equal(30);
    });

    it('three', () => {
      const score = calculateScore([
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
      ]);

      expect(score).to.equal(60);
    });

    it('four', () => {
      const score = calculateScore([
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
      ]);

      expect(score).to.equal(90);
    });
  });

  describe('spares in row', () => {
    it('one', () => {
      const score = calculateScore([
        {
          first: 3,
          second: 7,
        },
      ]);

      expect(score).to.equal(10);
    });

    it('two', () => {
      const score = calculateScore([
        {
          first: 1,
          second: 9,
        },
        {
          first: 2,
          second: 8,
        },
      ]);

      expect(score).to.equal(22);
    });

    it('three', () => {
      const score = calculateScore([
        {
          first: 4,
          second: 6,
        },
        {
          first: 3,
          second: 7,
        },
        {
          first: 9,
          second: 1,
        },
      ]);

      expect(score).to.equal(42);
    });

    it('four', () => {
      const score = calculateScore([
        {
          first: 2,
          second: 8,
        },
        {
          first: 6,
          second: 4,
        },
        {
          first: 0,
          second: 10,
        },
        {
          first: 3,
          second: 7,
        },
      ]);

      expect(score).to.equal(49);
    });
  });

  it('a strike and a spare', () => {
    const score = calculateScore([
      {
        first: 10,
        second: 0,
      },
      {
        first: 4,
        second: 6,
      },
    ]);

    expect(score).to.equal(30);
  });

  it('a strike and an open', () => {
    const score = calculateScore([
      {
        first: 10,
        second: 0,
      },
      {
        first: 3,
        second: 1,
      },
    ]);

    expect(score).to.equal(18);
  });

  it('a spare and a strike', () => {
    const score = calculateScore([
      {
        first: 7,
        second: 3,
      },
      {
        first: 10,
        second: 0,
      },
    ]);

    expect(score).to.equal(30);
  });

  it('two spares in row', () => {
    const score = calculateScore([
      {
        first: 7,
        second: 3,
      },
      {
        first: 1,
        second: 9,
      },
    ]);

    expect(score).to.equal(21);
  });

  it('a spare and an open', () => {
    const score = calculateScore([
      {
        first: 7,
        second: 3,
      },
      {
        first: 3,
        second: 1,
      },
    ]);

    expect(score).to.equal(17);
  });

  describe('full game', () => {
    it('all spares with bonus roll', () => {
      const score = calculateScore([
        {
          first: 7,
          second: 3,
        },
        {
          first: 3,
          second: 7,
        },
        {
          first: 2,
          second: 8,
        },
        {
          first: 0,
          second: 10,
        },
        {
          first: 4,
          second: 6,
        },
        {
          first: 5,
          second: 5,
        },
        {
          first: 8,
          second: 2,
        },
        {
          first: 9,
          second: 1,
        },
        {
          first: 7,
          second: 3,
        },
        {
          first: 3,
          second: 7,
          third: 6,
        },
      ]);

      expect(score).to.equal(147);
    });

    it('all strikes!', () => {
      const score = calculateScore([
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 10,
          third: 10,
        },
      ]);

      expect(score).to.equal(300);
    });

    it('the ninth is spare', () => {
      const score = calculateScore([
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 7,
          second: 3,
        },
        {
          first: 10,
          second: 10,
          third: 10,
        },
      ]);

      expect(score).to.equal(277);
    });

    it('the ninth is open', () => {
      const score = calculateScore([
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 10,
          second: 0,
        },
        {
          first: 6,
          second: 3,
        },
        {
          first: 10,
          second: 10,
          third: 10,
        },
      ]);

      expect(score).to.equal(264);
    });
  });
});
