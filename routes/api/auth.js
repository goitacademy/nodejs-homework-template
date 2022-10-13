const express = require("express")
const {authCtrl} = require("../../controllers")
const { ctrlWrapper } = require("../../helpers")
const { validateBody, authenticate } = require("../../middlewares")
const { userSchemas } = require("../../models")
const router = express.Router();

router.post("/signup",
  validateBody(userSchemas.signupSchema),
  ctrlWrapper(authCtrl.signup)
)

router.post("/login",
  validateBody(userSchemas.loginSchema),
  ctrlWrapper(authCtrl.login)
)

router.get("/current",
  authenticate,
  ctrlWrapper(authCtrl.getCurrent)
)

router.get("/logout",
  authenticate,
  ctrlWrapper(authCtrl.logout)
)

router.patch("/",
  authenticate,
  ctrlWrapper(authCtrl.updateSubscription)
)

module.exports = router;