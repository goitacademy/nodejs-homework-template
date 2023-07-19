import express from "express";

import contactsControllers from "../../controllers/contacts-controllers.js";



const contactsRouter = express.Router();



contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:id", contactsControllers.getById);

contactsRouter.post("/", contactsControllers.add);

contactsRouter.delete("/:id", contactsControllers.deleteById);

contactsRouter.put("/:id", contactsControllers.updateById);


export default contactsRouter;
