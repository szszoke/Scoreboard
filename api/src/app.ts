import * as express from 'express';
import * as bodyParser from 'body-parser';
import api from 'Routes/api';

export default new class {
  private readonly app = express();

  private init = () => {
    this.app.use(bodyParser.json());
    this.app.use('/api', api);
  };

  listen = (port: number) => {
    this.init();

    this.app.listen(port);
    console.log('Listening on PORT', port);
  };
}();
