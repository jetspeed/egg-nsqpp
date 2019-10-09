'use strict';
const nsq = require('nsqjs');
const genericPool = require('generic-pool');
const debug = require('debug')('egg-nsqpp');

const nsqPool = Symbol('egg-nsqpp#pool');

function factory(config) {
  return {
    create: () => {
      debug('[egg-nsqpp] create new client');
      const client = new nsq.Writer('94.191.75.136', 4150);
      client.connect();
      return client;
    },
    destroy: client => {
      debug('[egg-nsqpp] destroy client');
      client.close();
    },
    validate: client => {
      return true;
    },
  };
}


function initPool(app, config) {
  if (!app[nsqPool]) {
    debug('[egg-nsqpp] create pool');
    app[nsqPool] = genericPool.createPool(factory(config), { testOnBorrow: true, testOnReturn: true, ...config.pool });
  }
}

module.exports = app => {
  app.beforeStart(() => {
    const config = app.config.nsqpp;
    try {
      initPool(app, config);
      app.nsqpp = function() {
      debug('[egg-nsqpp] get client');
        return app[nsqPool].acquire().then(client => {
          debug('[egg-nsqpp] release client');
          app[nsqPool].release(client);
          return client;
        });
      };
    } catch (err) {
      app.coreLogger.error(`[egg-nsqpp] ${err.toString()}`);
    }
  });
  app.beforeClose(async () => {
    await app[nsqPool].drain().then(function() {
      app[nsqPool].clear();
    });
  });
};
