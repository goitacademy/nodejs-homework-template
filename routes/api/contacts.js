const express = require('express');

const ContactsService = require("../../controllers/ContactsService.js");
const validate = require("../../middlewares/validate.js");
const schema = require("../../middlewares/schema/contact.js");
const authMiddleware = require("../../middlewares/auth");

const router = express.Router();


router.get("/", authMiddleware, ContactsService.getAllContacts);

router.get("/:contactId", authMiddleware,ContactsService.getContactById);

router.post("/", authMiddleware, validate(schema), ContactsService.addNewContact);

router.delete("/:contactId", authMiddleware, ContactsService.deleteContact);

router.put(
  "/:contactId",
  authMiddleware, validate(schema),
  ContactsService.updateContactId
);

router.patch(
  "/:contactId/favorite",
  authMiddleware, validate(schema),
  ContactsService.changeContactFavorite
);

module.exports = router

// const express = require("express");
// const ContactsService = require("../../controllers/ContactsService.js");
// const validate = require("../../middlewares/validate.js");
// const schema = require("../../middlewares/schema/contact.js");
// const authMiddleware = require("../../middlewares/auth");

// const router = express.Router();

// router.use(authMiddleware);

// router.get("/", ContactsService.getAllContacts);
// router.get("/:contactId", ContactsService.getContactById);
// router.post("/", validate(schema), ContactsService.addNewContact);
// router.delete("/:contactId", ContactsService.deleteContact);
// router.put("/:contactId", validate(schema), ContactsService.updateContactId);
// router.patch(
//   "/:contactId/favorite",
//   validate(schema),
//   ContactsService.changeContactFavorite
// );

// module.exports = router;
