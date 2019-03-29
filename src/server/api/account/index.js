import {Router} from 'express';
import * as controller from '../account/account.controller';
import * as auth from '../../auth/auth.service';

const router = Router();

// router.get('/authenticate', auth.isAuthenticated());
router.post('/account/reset-password/init', auth.isAuthenticated(), controller.resetPassword);
// router.post('/account/change-password', auth.isAuthenticated(), controller.changePassword);
router.post('/activate', auth.isAuthenticated(),controller.activate);
router.post('/account',auth.isAuthenticated(), controller.updateAccount);
router.get('/account', auth.isAuthenticated(), controller.account);
router.post('/register', controller.register);

module.exports = router;
