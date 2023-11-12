import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { validaterBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../../shemas/contact-shemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validaterBody(contactAddSchema),
  contactsController.add
);

contactsRouter.delete("/:contactId", contactsController.deleteById);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  validaterBody(contactUpdateSchema),
  contactsController.updateById
);

export default contactsRouter;
