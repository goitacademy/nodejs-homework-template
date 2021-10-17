const express = require("express");
const router = express.Router();

const authController = require("../../controller/auth/users");
const { validateAuth } = require("../../middlewares/validation");
// const { joiSchema } = require("../../schemas/users");
// const { auth: ctrl } = require("../../controller");

// router
//   .get("/", contactsController.listContacts)
router.post(
  "/register",
  validateAuth,
  // validator(joiSchema),
  authController.register
);

router.post(
  "/login",
  validateAuth,
  // validator(joiSchema),
  authController.login
);
router.get("/logout", authController.logout);
// router
//   .get("/:contactId", contactsController.getById)
//   .delete("/:contactId", contactsController.removeContact)
//   .patch("/:contactId", validateContact, contactsController.updateContact);

module.exports = router;
