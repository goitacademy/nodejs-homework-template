const express = require('express');
const router = express.Router();
const { authCheckValid, schemaValidator } = require('../../middlewares');

const { users: ctrl } = require('../../controllers');

router.patch('/', authCheckValid, schemaValidator, ctrl.setSubscription);
router.get('/current', authCheckValid, ctrl.getCurrent);
router.post('/logout', authCheckValid, ctrl.logOut);

module.exports = router;
