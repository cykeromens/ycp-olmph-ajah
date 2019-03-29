import express from 'express';
import config from '../config/environment';
import User from '../api/user/user.model';

// Passport Configuration
require('./local/passport').setup(User, config);

let router = express.Router();

router.use('/', require('./local').default);

export default router;
