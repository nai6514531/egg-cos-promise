'use strict';

const mock = require('egg-mock');

describe('test/cos-promise.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/cos-promise-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    console.log('app', app, app.cos, app.ctx);
  });
});
