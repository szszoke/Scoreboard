import * as express from 'express';

const app = express();
const router = express.Router();

router.post('/score', async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.use(router);

const port = +process.env.PORT || 3000;
app.listen(port);
console.log('Listening on PORT', port);
