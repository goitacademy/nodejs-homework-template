import express from "express";
import ctrl from "../../controllers/contactsControllers.js"

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", ctrl.getById);

contactsRouter.post("/", ctrl.addContact);

contactsRouter.delete("/:id", ctrl.removeContactById);

contactsRouter.put("/:id", ctrl.updateContactById);


export default contactsRouter;
