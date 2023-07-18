import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post("/", contactsController.addNew);

contactsRouter.delete("/:contactId", contactsController.deleteById);

contactsRouter.put("/:contactId", contactsController.updateById);

export default contactsRouter;
