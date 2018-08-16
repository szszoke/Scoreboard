import { IFrame } from '@common/frame';

const isFrameStrike = (frame: IFrame): boolean => frame && frame.first === 10;
const isFrameSpare = (frame: IFrame): boolean =>
  frame &&
  frame.first < 10 &&
  frame.second <= 10 &&
  frame.first + frame.second === 10;

const getScore = <T extends IFrame, K extends keyof T>(obj: T, key: K) =>
  (obj && obj[key]) || 0;

const calculateFrameScore = (
  currentFrame: IFrame,
  followingFrames: IFrame[],
  frameIndex: number,
): number => {
  let score =
    getScore(currentFrame, 'first') + getScore(currentFrame, 'second');

  if (isFrameStrike(currentFrame)) {
    // strike!
    score += getScore(followingFrames[0], 'first');

    if (isFrameStrike(followingFrames[0])) {
      score += getScore(followingFrames[1], 'first');
    } else {
      score += getScore(followingFrames[0], 'second');
    }

    // if this is the 9th frame
    // add the the score of the third roll
    // from the tenth frame to the final score
    if (frameIndex === 8) {
      score += getScore(followingFrames[0], 'third');
    }

    // if it's the tenth frame
    // add the score of the bonus roll
    if (frameIndex === 9) {
      score += getScore(currentFrame, 'third');
    }
  } else if (isFrameSpare(currentFrame)) {
    // spare

    // if it's the tenth frame
    // add the score of the bonus roll
    if (frameIndex === 9) {
      score += getScore(currentFrame, 'third');
    }

    score += getScore(followingFrames[0], 'first');
  }

  return score;
};

const calculateScoreImpl = (
  frames: IFrame[],
  frameIndex: number,
  lastScore: number,
): number[] => {
  if (frames && frames.length > 0 && frameIndex < 10) {
    const currentFrame = frames[0];

    const restOfTheFrames = frames.slice(1);
    const currentScore =
      lastScore +
      calculateFrameScore(currentFrame, restOfTheFrames, frameIndex);

    return [
      currentScore,
      ...calculateScoreImpl(restOfTheFrames, ++frameIndex, currentScore),
    ];
  }

  return [];
};

export const calculateScore = (frames: IFrame[]): number[] =>
  calculateScoreImpl(frames, 0, 0);
