'use strict';

const mock = require('egg-mock');

describe('test/nsqpp.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/nsqpp-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, nsqpp')
      .expect(200);
  });
});
