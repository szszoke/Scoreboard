import * as express from 'express';
import { calculateScore } from '@utils/calculate-score';

const api = express.Router();

api.post('/score', async (req, res) => {
  try {
    const score = calculateScore(req.body);

    res.json({
      score,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default api;
