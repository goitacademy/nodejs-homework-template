import express from "express";
import contactSchema from "../../schemas/contacts-schemas.js";
import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import validateBody from "../../decorators/validateBody.js";

const contactAddValidate = validateBody(contactSchema.contactAddSchema);
const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  contactAddValidate,
  contactsController.add
);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  contactAddValidate,
  contactsController.updateById
);

contactsRouter.delete("/:id", contactsController.deleteById);

export default contactsRouter;
