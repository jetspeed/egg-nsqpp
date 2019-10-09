'use strict';

const nsqpp = require('./lib/nsqpp');

module.exports = app => {
  app.wangxq = 'wanxqis';
  nsqpp(app);
};
