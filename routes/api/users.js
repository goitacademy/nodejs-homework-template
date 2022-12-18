const express = require('express');

const {users: ctrl} = require("../../controllers");

const { ctrlWrapper, isValiId } = require("../../helpers");

const {validateBody, auth} = require("../../middlewares");

const { joiRegisterSchema, joiLoginSchema } = require("../../schemas");

const router = express.Router();


router.post('/signup', validateBody(joiRegisterSchema), ctrlWrapper(ctrl.register));

router.post('/login', validateBody(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));


module.exports = router;