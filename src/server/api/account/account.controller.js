import User from '../user/user.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import {generateRandomString} from "../helper/helper-util";
import {sendMail} from "../../config/mail";

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    return res.status(statusCode).send(err);
  };
}

/**
 * Register a new user
 */
export function register(req, res) {
  const newUser = new User(req.body);
  let randomString = generateRandomString(100);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.activationKey = randomString;
  return newUser.save()
    .then(function (user) {
      sendMail(user,"Activation Message!").catch(console.error);
      const token = jwt.sign({_id: user._id}, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({token});
    })
    .catch(validationError(res));
}

/**
 * Activate registered User
 */
export function activate(req, res, next) {
  const key = req.params.key;

  return User.findOne({key: key}, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      user.activate = true;
      user.activationKey = null;
      return res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Get my info
 */
export function account(req, res, next) {
  const userId = req.user._id;

  return User.findOne({_id: userId}, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      return res.json(user);
    })
    .catch(err => next(err));
}


/**
 * Update User info
 */
export function updateAccount(req, res, next) {
  const userId = req.user._id;

  return User.findOne({_id: userId}, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      user.firstName = req.user.firstName;
      user.lastName = req.user.lastName;
      user.email = req.user.email;
      user.save();
      return res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

// /**
//  * Change a users password
//  */
// export function changePassword(req, res) {
//   var userId = req.user._id;
//   var oldPass = String(req.body.oldPassword);
//   var newPass = String(req.body.newPassword);
//
//   return User.findById(userId).exec()
//     .then(user => {
//       if (user.authenticate(oldPass)) {
//         user.password = newPass;
//         return user.save()
//           .then(() => {
//             res.status(204).end();
//           })
//           .catch(validationError(res));
//       } else {
//         return res.status(403).end();
//       }
//     });
// }

/**
 * Init reset password, sends an email to the user reset email
 */
export function resetPassword(req, res) {
  let email = req.email;
  console.log("reset password of "+ email);
}


/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}


