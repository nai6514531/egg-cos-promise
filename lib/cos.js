'use strict';
const COS = require('cos-nodejs-sdk-v5');
const { promisify } = require('util');
const assert = require('assert');

function checkBucketConfig(config) {
  assert(config.bucket || config.region,
    '[egg-cos-promise] Must set `bucket` or `region` in cos\'s config');
  assert(config.secretKey && config.secretId,
    '[egg-cos-promise] Must set `secretId` and `secretKey` in cos\'s config');
}

module.exports = app => {
  app.addSingleton('cos', (config, app) => {
    config = Object.assign({}, config);
    checkBucketConfig(config);
    const cos = new COS({
      SecretId: config.secretId,
      SecretKey: config.secretKey,
    })
    const cosProto = cos.__proto__
    for (let funcName in cosProto) {
      if(typeof cosProto[funcName] === 'function') {
        cos[funcName] = promisify(cosProto[funcName])
      }
    }
    return cos;
  });
  app.createCos = app.cos.createInstance.bind(app.cos);
};
