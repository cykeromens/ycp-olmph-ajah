/**
 * Main application routes
 */

import errors from './errors';
import path from 'path';

export default function (app) {
  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      console.log(`${app.get('appPath')}/index.html`);
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
