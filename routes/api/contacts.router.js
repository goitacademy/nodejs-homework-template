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
const { tryCatchWrapper } = require("../../helpers/wrappers");

const { auth } = require("../../middlewares/authMiddleware");

contactsRouter.get(
  "/",
  tryCatchWrapper(auth),
  tryCatchWrapper(getAllController)
);

contactsRouter.get(
  "/:contactId",
  tryCatchWrapper(auth),
  tryCatchWrapper(getContactByIdController)
);

contactsRouter.post(
  "/",
  tryCatchWrapper(auth),
  tryCatchWrapper(createContactController)
);

contactsRouter.delete(
  "/:contactId",
  tryCatchWrapper(auth),
  tryCatchWrapper(removeContactController)
);

contactsRouter.put(
  "/:contactId",
  tryCatchWrapper(auth),
  tryCatchWrapper(updateContactController)
);

contactsRouter.patch(
  "/:contactId/favorite",
  tryCatchWrapper(auth),
  tryCatchWrapper(updateStatusContactController)
);

module.exports = contactsRouter;
