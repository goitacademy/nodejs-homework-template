const express = require("express");

const ctrl = require("../../controllers/verify");


const { validateBody} = require("../../middlewares");
const { schemas } = require("../../models/user");


const router = express.Router();


router.get("/verify/:verificationToken", ctrl.verifyEmail)

router.post("/verify", validateBody(schemas.emailSchema), ctrl.resendEmail)


module.exports = router;