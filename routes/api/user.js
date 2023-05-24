const express = require('express');
const { validateBody, authorization } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();
const ctrl = require('../../controllers/user')

router.post('/register', validateBody(schemas.userJoiSchema), ctrl.register);

router.post('/login', validateBody(schemas.userJoiSchema), ctrl.login)

router.get("/current", authorization, ctrl.getCurrent);

router.post('/logout', authorization, ctrl.logout);

router.patch('/', authorization,validateBody(schemas.validateSubscription),  ctrl.updateSubscription )

module.exports = router;