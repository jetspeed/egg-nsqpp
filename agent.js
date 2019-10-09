'use strict';

const nsqpp = require('./lib/nsqpp');

module.exports = agent => {
  nsqpp(agent);
};
