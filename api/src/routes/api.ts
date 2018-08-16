import * as express from 'express';
import { calculateScore } from '@utils/calculate-score';
import { ICalculateScoreResponse } from '@common/calculate-score-response';

const api = express.Router();

api.post('/score', async (req, res) => {
  try {
    const scores = calculateScore(req.body);

    res.json({
      scores,
      totalScore: scores[scores.length - 1] || 0,
    } as ICalculateScoreResponse);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default api;
