import { IFrame } from '@common/frame';

export interface ICalculateScoreTestCase {
  frames: IFrame[];
  score: number;
}

// Strikes
export const ONE_STRIKE: ICalculateScoreTestCase = {
  frames: [
    {
      first: 10,
      second: 0,
    },
  ],
  score: 10,
};

export const TWO_STRIKES: ICalculateScoreTestCase = {
  frames: [
    {
      first: 10,
      second: 0,
    },
    {
      first: 10,
      second: 0,
    },
  ],
  score: 30,
};

export const THREE_STRIKES: ICalculateScoreTestCase = {
  frames: [
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
  ],
  score: 60,
};

export const FOUR_STRIKES: ICalculateScoreTestCase = {
  frames: [
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
  ],
  score: 90,
};

// Spares
export const ONE_SPARE: ICalculateScoreTestCase = {
  frames: [
    {
      first: 3,
      second: 7,
    },
  ],
  score: 10,
};

export const TWO_SPARES: ICalculateScoreTestCase = {
  frames: [
    {
      first: 1,
      second: 9,
    },
    {
      first: 2,
      second: 8,
    },
  ],
  score: 22,
};

export const THREE_SPARES: ICalculateScoreTestCase = {
  frames: [
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
  ],
  score: 42,
};

export const FOUR_SPARES: ICalculateScoreTestCase = {
  frames: [
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
  ],
  score: 49,
};

// Mixed
export const STRIKE_AND_SPARE: ICalculateScoreTestCase = {
  frames: [
    {
      first: 10,
      second: 0,
    },
    {
      first: 4,
      second: 6,
    },
  ],
  score: 30,
};

export const STRIKE_AND_OPEN: ICalculateScoreTestCase = {
  frames: [
    {
      first: 10,
      second: 0,
    },
    {
      first: 3,
      second: 1,
    },
  ],
  score: 18,
};

export const SPARE_AND_STRIKE: ICalculateScoreTestCase = {
  frames: [
    {
      first: 7,
      second: 3,
    },
    {
      first: 10,
      second: 0,
    },
  ],
  score: 30,
};

export const TWO_SPARES_IN_ROW: ICalculateScoreTestCase = {
  frames: [
    {
      first: 7,
      second: 3,
    },
    {
      first: 1,
      second: 9,
    },
  ],
  score: 21,
};

export const SPARE_AND_OPEN: ICalculateScoreTestCase = {
  frames: [
    {
      first: 7,
      second: 3,
    },
    {
      first: 3,
      second: 1,
    },
  ],
  score: 17,
};

export const FULL_GAME_ALL_SPARES: ICalculateScoreTestCase = {
  frames: [
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
  ],
  score: 147,
};

export const FULL_GAME_ALL_STRIKES: ICalculateScoreTestCase = {
  frames: [
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
  ],
  score: 300,
};

export const FULL_GAME_NINTH_SPARE: ICalculateScoreTestCase = {
  frames: [
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
  ],
  score: 277,
};

export const FULL_GAME_NINTH_OPEN: ICalculateScoreTestCase = {
  frames: [
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
  ],
  score: 264,
};
