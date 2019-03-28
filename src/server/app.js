/**
 * Main application file
 */

import express from 'express';
import mongoose from 'mongoose';
import config from './config/environment';
import http from 'http';
import initWebSocketServer from './config/websockets';
import expressConfig from './config/express';
import registerRoutes from './routes';
import seedDatabaseIfNeeded from './config/seed';

mongoose.Promise = require('bluebird');


// Connect to MongoDB
const mongooseConnectionPromise = mongoose.connect(config.mongo.uri, config.mongo.options,
  function () {

  }
);
mongoose.connection.on('error', function (err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

// Setup server
let app = express();
let server = http.createServer(app);
const wsInitPromise = initWebSocketServer(server);
expressConfig(app);
registerRoutes(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

wsInitPromise
  .then(primus => {
    app.primus = primus;
  })
  .then(() => mongooseConnectionPromise)
  .then(seedDatabaseIfNeeded)
  .then(startServer)
  .catch(err => {
    console.log('Server failed to start due to error: %s', err);
  });


// Expose app
exports = module.exports = app;
