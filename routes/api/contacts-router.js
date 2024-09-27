import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:contactId", contactsControllers.getById);

contactsRouter.post("/", contactsControllers.add);

contactsRouter.delete("/:contactId", contactsControllers.deleteById);

contactsRouter.put("/:contactId", contactsControllers.updateById);

export default contactsRouter;
