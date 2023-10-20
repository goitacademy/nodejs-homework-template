const express = require("express");
const isEmptyBody = require("../../middlewares/isEmptyBody");
const validateBody = require("../../decorators/validateBody");
const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("../../models/Contact");

const { isValidId } = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

const contactsController = require("../../controllers/contacts-controller");

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  upload.single("avatar"),
  isEmptyBody,
  contactAddValidate,
  contactsController.add
);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  contactAddValidate,
  contactsController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  contactUpdateFavoriteValidate,
  contactsController.updateFavoriteStatus
);
module.exports = contactsRouter;
