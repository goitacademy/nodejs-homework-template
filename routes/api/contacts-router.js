const express = require("express");
const isEmptyBody = require("../../middlewares/isEmptyBody");
const validateBody = require("../../decorators/validateBody");
const contactAddSchema = require("../../schemes/movie-schemes");

const contactAddValidate = validateBody(contactAddSchema);

const contactsController = require("../../controllers/contacts-controller");

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", contactsController.deleteById);

contactsRouter.post(
  "/",
  isEmptyBody,
  contactAddValidate,
  contactsController.add
);

contactsRouter.delete("/:id", contactsController.deleteById);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  contactAddValidate,
  contactsController.updateById
);

module.exports = contactsRouter;
