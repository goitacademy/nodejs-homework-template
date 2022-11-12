const express = require('express');
const { validation, authMiddleware, ctrlWrapper, upload } = require('../../middlewares');
const { updateSubscriptionJoiSchema } = require('../../models/users');
const ctrl = require("../../controllers/authCtrl");

const router = express.Router();


router.get('/current', authMiddleware, ctrlWrapper(ctrl.getCurrent));

router.patch('/', authMiddleware, validation(updateSubscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription));

router.patch('/avatars', authMiddleware, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));


module.exports = router;