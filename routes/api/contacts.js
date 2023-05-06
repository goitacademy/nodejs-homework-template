const express = require("express");
const contactsRouter = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

contactsRouter.get("/", ctrl.listContactsWr);

contactsRouter.get("/:contactId", ctrl.getContactByIdWr);

contactsRouter.post("/", validateBody(schemas.addSchema), ctrl.addContactWr);

contactsRouter.delete("/:contactId", ctrl.removeContactWr);

contactsRouter.put(
  "/:contactId",
  validateBody(schemas.updateSchema),
  ctrl.updateContactWr
);

module.exports = contactsRouter;
