const express = require('express');

const { userAuth, ctrlWrapper } = require('../../middlewares');
const { auth: controller } = require('../../controllers');

const router = express.Router();

router.get('/current', userAuth, ctrlWrapper(controller.getCurrent));

module.exports = router;