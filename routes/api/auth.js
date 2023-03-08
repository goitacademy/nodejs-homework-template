const express = require('express');
const router = express.Router();

const controller = require('../../controllers/auth');
const ctrlWrapper = require('../../helpers/ctrlWrapper')

const  validation  = require('../../middlewares/validate');
const { registerSchema, loginSchema } = require('../../models/user');


router.post("/register", validation(registerSchema), ctrlWrapper(controller.register) );

router.post("/login", validation(loginSchema), ctrlWrapper(controller.login));

router.get("/current",  ctrlWrapper(controller.current));

router.post("/logout",  ctrlWrapper(controller.logout));

router.patch("/",  ctrlWrapper(controller.subscription));





module.exports = router;