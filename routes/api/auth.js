const express = require('express')
const router = express.Router()
const { ctrlWrapper } = require("../../helpers/index");
const controller = require('../../controllers/auth')
router.post("/users/register", ctrlWrapper(controller.registration));
router.post("/users/login", ctrlWrapper(controller.login));
module.exports = router