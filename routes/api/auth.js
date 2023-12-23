const express = require('express');

const {validateBody, authenticate, upload} = require('../../middlewares/index');

const {schemas} = require('../../models/users');

const ctrl = require('../../controllers/auth');

const router = express.Router();

 
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatart);

module.exports = router;