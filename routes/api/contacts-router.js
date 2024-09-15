import express from "express";
import ctrl from "../../controllers/contacts-controllers.js";
const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", ctrl.getById);

contactsRouter.post("/", ctrl.addNewContact);

contactsRouter.put("/:id", ctrl.updateContact);

contactsRouter.delete("/:id", ctrl.deleteContact);

export default contactsRouter;
