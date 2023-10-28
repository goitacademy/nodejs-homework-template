const express = require("express");
const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../decorators/");

const {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../../models/Contact");
const isValidId = require("../../middlewares/isValidId");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAll);

contactsRouter.get("/:contactId", isValidId, ctrl.getByIdContact);

contactsRouter.post("/", validateBody(addSchema), ctrl.addNewContact);

contactsRouter.put(
  "/:contactId",
  isValidId,
  validateBody(updateSchema),
  ctrl.updateByIdContact
);

contactsRouter.delete("/:contactId", isValidId, ctrl.removeByIdContact);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = contactsRouter;
