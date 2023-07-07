const express = require("express");
const router = express.Router();
// s
const {
  avatarUploader,
} = require("../middleware/avatarUploader/avatarUploader");
const auth = require("../middleware/auth/auth");
const controllerUsers = require("../controller/users");
const controllerContac = require("../controller/contacts");

router.post("/users/signup", controllerUsers.signup);

router.post("/users/login", controllerUsers.login);

router.get("/users/current", auth, controllerUsers.getCurrentUser);

router.post("/users/logout", auth, controllerUsers.logout);

router.patch("/users/", auth, controllerUsers.changeSubscription);

router.patch(
  "/users/avatars",
  auth,
  avatarUploader.single("avatar"),
  controllerUsers.addAvatar
);

router.get("/users/verify/:verificationToken", controllerUsers.verifyUser);

router.post("/users/verify", controllerUsers.resendVerificationEmail);

router.get("/contacts", auth, controllerContac.getContacts);

router.get("/contacts/:contactId", auth, controllerContac.getContactById);

router.post("/contacts", auth, controllerContac.create);

router.put("/contacts/:contactId", auth, controllerContac.update);

router.patch(
  "/contacts/:contactId/favorite",
  auth,
  controllerContac.updateStatus
);

router.delete("/contacts/:contactId", auth, controllerContac.remove);

module.exports = router;
