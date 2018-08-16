import * as express from 'express';
import * as bodyParser from 'body-parser';
import api from '@routes/api';
import { Server } from 'http';

export default new class {
  private readonly app = express();

  private init = () => {
    this.app.use(bodyParser.json());
    this.app.use('/api', api);
  };

  listen = (port: number, callback?: Function): Server => {
    this.init();

    return this.app.listen(port, callback);
  };
}();
