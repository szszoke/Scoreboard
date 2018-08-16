import * as supertest from 'supertest';
import { Server } from 'http';
import 'mocha';
import app from '@/app';
import { ONE_STRIKE } from '@/utils/mocks';
import { expect } from 'chai';

describe('api', () => {
  let server: Server = null;

  before(() => {
    server = app.listen(3001);
  });

  after(() => {
    server.close();
  });

  describe('score', () => {
    it('should return json with correct schema', done => {
      supertest(server)
        .post('/api/score')
        .send(ONE_STRIKE.frames)
        .expect('Content-Type', /json/)
        .expect(200, (_, res) => {
          expect(res.body)
            .to.have.property('scores')
            .that.is.an('array');
          res.body.scores.forEach(score => expect(score).to.be.a('number'));
          expect(res.body)
            .to.have.property('totalScore')
            .that.is.a('number');

          done();
        });
    });
  });
});
