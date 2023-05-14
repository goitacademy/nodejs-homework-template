const express = require("express");
const {validateBody, authenticate, upload, uploadChecker} = require("../../middlewares");
const {schemas} = require("../../models/user");
const ctrl = require("../../controllers/auth");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register); 

// signin   
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, validateBody(schemas.updateSubscriptionSchema), ctrl.updateSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), uploadChecker, ctrl.updateAvatar);


module.exports = router;
