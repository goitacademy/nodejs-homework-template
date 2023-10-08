import express from "express";
import contactsControllers from "../../controllers/contacts.controller.js";
import {
  isEmptyBody,
  contactValidateRequired,
  contactValidateValues,
  isValidId,
} from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:id", isValidId, contactsControllers.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  contactValidateRequired,
  contactValidateValues,
  contactsControllers.add
);

// contactsRouter.delete("/:id", isValidId, contactsControllers.deleteById);

// contactsRouter.put(
//   "/:id",
//   isValidId,
//   isEmptyBody,
//   contactValidateRequired,
//   contactValidateValues,
//   contactsControllers.updateById
// );

export default contactsRouter;
