'use strict';
const COS = require('cos-nodejs-sdk-v5');
// const { promisify } = require('util');
const assert = require('assert');

function checkBucketConfig(config) {
  assert(config.bucket || config.region,
    '[egg-cos] Must set `bucket` or `region` in cos\'s config');
  assert(config.secretKey && config.secretId,
    '[egg-cos] Must set `secretId` and `secretKey` in cos\'s config');
}

module.exports = app => {
  app.addSingleton('cos', (config, app) => {
    console.log('app', app);
    config = Object.assign({}, config);
    checkBucketConfig(config);
    return new COS(config);
  });
  app.createCos = app.cos.createInstance.bind(app.cos);
};
