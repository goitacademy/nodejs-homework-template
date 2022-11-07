const express = require('express');
const { validation, authMiddleware, ctrlWrapper } = require('../../middlewares');
const { updateSubscriptionJoiSchema } = require('../../models/users');
const ctrl = require("../../controllers/authCtrl");

const router = express.Router();


router.get('/current', authMiddleware, ctrlWrapper(ctrl.getCurrent));

router.patch('/', authMiddleware, validation(updateSubscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription));


module.exports = router;