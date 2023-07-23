import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

const contactsRouter = express.Router();
//--GET All
contactsRouter.get("/", contactsController.getAll);

//--GET by ID
contactsRouter.get("/:id", contactsController.getById);

//--POST conntact
contactsRouter.post("/", contactsController.add);

//--Put by ID (update)
contactsRouter.put("/:id", contactsController.updateById);

//--delete (remote contact by ID)
contactsRouter.delete("/:id", contactsController.deleteById);

export default contactsRouter;
