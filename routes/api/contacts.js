const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { schemas } = require("../../models/contact");
const { validateBody } = require("../../middlewares");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addContactsShema), ctrl.addContact);

// router.put(
//   "/:contactId",
//   validateBody(schemas.addContactsShema),
//   ctrl.updateContact
// );

// router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
