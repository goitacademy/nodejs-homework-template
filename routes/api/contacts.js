const express = require("express");
const contactsRouter = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

contactsRouter.get("/", ctrl.getContactsWr);

contactsRouter.get("/:contactId", ctrl.getContactByIdWr);

contactsRouter.post(
  "/",
  validateBody(schemas.addSchema, "missing required name field"),
  ctrl.addContactWr
);

contactsRouter.delete("/:contactId", ctrl.removeContactWr);

contactsRouter.put(
  "/:contactId",
  validateBody(schemas.updateSchema, "incorrect data"),
  ctrl.updateContactWr
);

contactsRouter.patch(
  "/:contactId/favorite",
  validateBody(schemas.favoriteSchema, "missing field favorite"),
  ctrl.updateStatusContactWr
);

module.exports = contactsRouter;
