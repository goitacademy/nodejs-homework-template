const express = require("express");
const contactsRouter = express.Router();

const ctrl = require("../../controllers/contacts/contacts-controllers");
const { validation, isValidId, isAmptyBody } = require("../../middlewares");
const { contactsSchema, updStatusSchema } = require("../../schemas");

const validateMiddleWare = validation(contactsSchema);
const validateStatus = validation(updStatusSchema);

contactsRouter.get("/", ctrl.getAll);

contactsRouter.post("/", isAmptyBody, validateMiddleWare, ctrl.add);

contactsRouter.get("/:id", isValidId, ctrl.getById);

contactsRouter.put(
  "/:id",
  isAmptyBody,
  isValidId,
  validateMiddleWare,
  ctrl.updById
);

contactsRouter.delete("/:id", ctrl.deleteById);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateStatus,
  ctrl.updStatusContact
);

module.exports = contactsRouter;
