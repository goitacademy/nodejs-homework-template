const express = require('express');

const { tryCatchWrapper } = require('../helpers/index.js');
const {
  updateContactService,
  deleteContactService,
  createContactService,
  getContactService,
  getContactsService,
} = require("../controllers/contacts.controllers");
const { validateBody } = require("../middlewares/index");
const {
  addContactSchema,
  updateContactSchema,
} = require("../middlewares/schemas");

const router = express.Router();

router.get("/", tryCatchWrapper(getContactsService));

router.get("/:contactId", tryCatchWrapper(getContactService));

router.post(
  "/",
  validateBody(addContactSchema),
  tryCatchWrapper(createContactService)
);

router.delete("/:contactId", tryCatchWrapper(deleteContactService));

router.put(
  "/:contactId",
  validateBody(updateContactSchema),
  tryCatchWrapper(updateContactService)
);

module.exports = router
