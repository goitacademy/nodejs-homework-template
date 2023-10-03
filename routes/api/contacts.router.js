import express from "express";
import contactsControllers from "../../controllers/contacts.controller.js";
import {
  isEmptyBody,
  contactValidateRequired,
  contactValidateValues,
} from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAll);

// contactsRouter.get("/:id", contactsControllers.getById);

// contactsRouter.post(
//   "/",
//   isEmptyBody,
//   contactValidateRequired,
//   contactValidateValues,
//   contactsControllers.add
// );

// contactsRouter.delete("/:id", contactsControllers.deleteById);

// contactsRouter.put(
//   "/:id",
//   isEmptyBody,
//   contactValidateRequired,
//   contactValidateValues,
//   contactsControllers.updateById
// );

export default contactsRouter;
