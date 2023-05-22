const express = require('express');

const authControllers = require('../../controllers/auth-controllers');

const { schemas } = require('../../models/user');

const { validateBody, authenticate } = require('../../middlewares');



const router = express.Router();

// signup
router.post('/register', validateBody(schemas.userRegisterSchema), authControllers.register);

// signin
router.post('/login', validateBody(schemas.userLoginSchema), authControllers.login);

// current
router.get('/current', authenticate, authControllers.getCurrent);

// signout
router.post('/logout', authenticate, authControllers.logout);

// patch
router.patch("/subscription", authenticate, validateBody(schemas.userUpdateSchema), authControllers.updateSubscription)

module.exports = router;
