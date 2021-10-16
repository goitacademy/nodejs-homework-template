const express = require("express");

const authController = require("../../controller/auth");
const { validator } = require("../../middlewares");
const { joiSchema } = require("../../schemas/users");
const { auth: ctrl } = require("../../controller");
const router = express.Router();

// router
//   .get("/", contactsController.listContacts)
router.post(
  "/register",
  // validator(joiSchema),
  authController.register
);

router.post(
  "/login",
  // validator(joiSchema),
  authController.login
);
router.get("/logout", authController.logout);
// router
//   .get("/:contactId", contactsController.getById)
//   .delete("/:contactId", contactsController.removeContact)
//   .patch("/:contactId", validateContact, contactsController.updateContact);

module.exports = router;
