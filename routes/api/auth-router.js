const express = require('express');
const { validateRegistrationLogin, validateUpdSubscrip } = require('../../validations/authValidations');
const controllers = require('../../controllers/authControllers');
const authorization = require('../../middlewares/authorization');
const upload = require('../../middlewares/uploads');

const router = express.Router();


router.post("/register", validateRegistrationLogin, controllers.registerUser);

router.post("/login", validateRegistrationLogin, controllers.loginUser);

router.post("/logout", authorization, controllers.logoutUser);

router.get("/current", authorization, controllers.currentUser);

router.patch("/", authorization, validateUpdSubscrip, controllers.updateUserSubscript);

router.patch("/avatars", authorization, upload.single("avatar"), controllers.updateUserAvatar);

module.exports = router;