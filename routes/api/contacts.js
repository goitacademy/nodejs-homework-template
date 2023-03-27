const express = require("express");
const contactsRouter = express.Router();

const {
  deleteContact,
  postContact,
  putContact,
  getContact,
  getContacts,
  updateStatusContact,
} = require("../../controllers/contactsController");
const { tryCatchWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares/index");
const {
  addContactSchema,
  addContactStatusSchema,
} = require("../../schemas/contactSchema.js");

contactsRouter.get("/", tryCatchWrapper(getContacts));

contactsRouter.get("/:contactId", tryCatchWrapper(getContact));

contactsRouter.post(
  "/",
  validateBody(addContactSchema),
  tryCatchWrapper(postContact)
);

contactsRouter.delete("/:contactId", tryCatchWrapper(deleteContact));

contactsRouter.put(
  "/:contactId",
  validateBody(addContactSchema),
  tryCatchWrapper(putContact)
);

contactsRouter.patch(
  "/:contactId/favorite",
  validateBody(addContactStatusSchema),
  tryCatchWrapper(updateStatusContact)
);

module.exports = {
  contactsRouter,
};
