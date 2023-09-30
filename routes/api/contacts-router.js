import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import {
  isEmptyBody,
  contactValidateRequired,
  contactValidateValues,
} from "../../middlewares/index.js";

const contactsRouter = express.Router();

// працює
contactsRouter.get("/", contactsControllers.getAll);
// працює
contactsRouter.get("/:id", contactsControllers.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  contactValidateRequired,
  contactValidateValues,
  contactsControllers.add
);

contactsRouter.delete("/:id", contactsControllers.updateById);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  contactValidateRequired,
  contactValidateValues,
  contactsController.updateById
);

export default contactsRouter;
