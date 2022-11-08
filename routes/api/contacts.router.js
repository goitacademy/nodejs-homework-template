const express = require("express");
const contactsRouter = express.Router();

const {
  getAllController,
  getContactByIdController,
  createContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contacts.controller");
const { tryCatchWrapper } = require("../../helpers");

contactsRouter.get("/", tryCatchWrapper(getAllController));

contactsRouter.get("/:contactId", tryCatchWrapper(getContactByIdController));

contactsRouter.post("/", tryCatchWrapper(createContactController));

contactsRouter.delete("/:contactId", tryCatchWrapper(removeContactController));

contactsRouter.put("/:contactId", tryCatchWrapper(updateContactController));

contactsRouter.patch(
  "/:contactId/favorite",
  tryCatchWrapper(updateStatusContactController)
);

module.exports = contactsRouter;
