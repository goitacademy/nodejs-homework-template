import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import {
  authenticate,
  isEmptyBody,
  isValidId,
  isEmptyBodyFav,
} from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);
contactsRouter.get("/", contactsController.getAll);
contactsRouter.post("/", isEmptyBody, contactsController.add);
contactsRouter.get("/:id", isValidId, contactsController.getById);
contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  contactsController.updateContact
);
contactsRouter.delete("/:id", isValidId, contactsController.deleteContact);
contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBodyFav,
  contactsController.updateStatusContact
);

export default contactsRouter;
