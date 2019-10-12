'use strict';

/**
 * egg-nsqpp default config
 * @member Config#nsqpp
 * @property {String} SOME_KEY - some description
 */
exports.nsqpp = {
  nsqdHost: '127.0.0.1',
  nsqdPort: '4150',
  pool: {
    max: 10, // maximum size of the pool
    min: 2, // minimum size of the pool
    testOnBorrow: true,
  },
};
