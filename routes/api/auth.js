const express = require('express');
const router = express.Router();

const { auth: ctrl } = require('../../controllers');
console.log(ctrl, 'routeAuth');
const { validateMiddleware, authenticate } = require('../../middleware');
const {
  user: { validateUser },
} = require('../../model/schemas');

router.post(
  '/signup',
  express.json(),
  validateMiddleware(validateUser),
  ctrl.signup,
);
router.post(
  '/login',
  express.json(),
  validateMiddleware(validateUser),
  ctrl.login,
);
router.get('/logout', authenticate, ctrl.logout);

module.exports = router;
