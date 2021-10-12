const express = require("express");

const { auth: ctrl } = require("../../controller");
const { validateContact } = require("../../service/validation");
const { JoiSchema } = require("../../model/user");
const router = express.Router();
// router
//   .get("/", contactsController.listContacts)
router.post("/register", validateContact(ctrl.register));
router.post("/login", validateContact(ctrl.login));
router.get("/logout", validateContact(ctrl.logout));
// router
//   .get("/:contactId", contactsController.getById)
//   .delete("/:contactId", contactsController.removeContact)
//   .patch("/:contactId", validateContact, contactsController.updateContact);

module.exports = router;
