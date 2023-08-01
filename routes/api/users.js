<<<<<<< Updated upstream
const express = require('express');
const controllers = require('../../controllers');
const { authenticate, upload } = require('../../middlewares');
const router = express.Router();


router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.get('/current', authenticate, controllers.getCurrent);
router.post('/logout', authenticate, controllers.logout);
router.patch('/', authenticate, controllers.updateUserSub),
router.patch('/avatars', authenticate, upload.single('avatar'), controllers.updateAvatar)

module.exports = router

=======
const express = require("express");
const controllers = require("../../controllers");
const { authenticate, upload } = require("../../middlewares");
const router = express.Router();
// const fs = require("fs/promises");

router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.get("/current", authenticate, controllers.getCurrent);
router.post("/logout", authenticate, controllers.logout);

// Об'єднуємо два роутери в один
router.patch(
  "/",
  authenticate,
  controllers.updateUserSub,
  authenticate,
  upload.single("avatar"),
  controllers.updateAvatar
);

module.exports = router;
>>>>>>> Stashed changes
