import * as supertest from 'supertest';
import { Server } from 'http';
import { expect } from 'chai';
import 'mocha';
import app from '@/app';
import { ONE_STRIKE } from '@/utils/mocks';

describe('api', () => {
  let server: Server = null;

  before(() => {
    server = app.listen(3001);
  });

  after(() => {
    server.close();
  });

  describe('score', () => {
    it('json content type', done => {
      supertest(server)
        .post('/api/score')
        .send(ONE_STRIKE.frames)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
