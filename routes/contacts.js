const express = require('express');

const { tryCatchWrapper } = require('../helpers/index');
const {
  updateContactService,
  removeContactService,
  createContactService,
  getContactService,
  getContactsService,
  updateStatusContactService,
} = require("../controllers/index");
const {
  validateBody,
  addContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} = require("../middlewares/index");

const contactsRouter = express.Router();

contactsRouter.get("/", tryCatchWrapper(getContactsService));

contactsRouter.get("/:contactId", tryCatchWrapper(getContactService));

contactsRouter.post(
  "/",
  validateBody(addContactSchema),
  tryCatchWrapper(createContactService)
);

contactsRouter.delete("/:contactId", tryCatchWrapper(removeContactService));

contactsRouter.put(
  "/:contactId",
  validateBody(updateContactSchema),
  tryCatchWrapper(updateContactService)
);

contactsRouter.patch(
  "/:contactId/favorite",
  validateBody(updateStatusContactSchema),
  tryCatchWrapper(updateStatusContactService)
);

module.exports = { contactsRouter, };
