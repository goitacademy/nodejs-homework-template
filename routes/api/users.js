const express = require("express")
const { validateBody, authenticate } = require('../../middlewares')
const { signUserSchema } = require('../../models/joiSchemas')
const ctrl = require('../../controllers/users')
const router = express.Router()

// sign up
router.post("/register", validateBody(signUserSchema), ctrl.register)
// sign in
router.post("/login", validateBody(signUserSchema), ctrl.login)

router.post("/logout",
 authenticate,
  ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);





module.exports = router;