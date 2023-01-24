const express = require('express');

const { tryCatchWrapper } = require('../helpers/index.js');
const {
  updateContactService,
  removeContactService,
  createContactService,
  getContactService,
  getContactsService,
  updateStatusContactService,
} = require("../controllers/contacts.controllers");
const { validateBody } = require("../middlewares/index");
const {
  addContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} = require("../middlewares/schemas");

const router = express.Router();

router.get("/", tryCatchWrapper(getContactsService));

router.get("/:contactId", tryCatchWrapper(getContactService));

router.post(
  "/",
  validateBody(addContactSchema),
  tryCatchWrapper(createContactService)
);

router.delete("/:contactId", tryCatchWrapper(removeContactService));

router.put(
  "/:contactId",
  validateBody(updateContactSchema),
  tryCatchWrapper(updateContactService)
);

router.patch(
  "/:contactId/favorite",
  validateBody(updateStatusContactSchema),
  tryCatchWrapper(updateStatusContactService)
);

module.exports = router
