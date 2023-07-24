import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import contactsSchemas from "../../schemes/contacts-schemas.js";

import { validateBody } from "../../decorators/index.js";

import { isEmptyBody } from "../../middlewars/index.js";

const contactsRouter = express.Router();
//--GET All
contactsRouter.get("/", contactsController.getAll);

//--GET by ID
contactsRouter.get("/:id", contactsController.getById);

//--POST conntact
contactsRouter.post("/", isEmptyBody, validateBody(contactsSchemas.contactsAddSchema), contactsController.add
);

//--Put by ID (update)
contactsRouter.put("/:id", isEmptyBody, validateBody(contactsSchemas.contactsAddSchema), contactsController.updateById);

//--delete (remote contact by ID)
contactsRouter.delete("/:id", contactsController.deleteById);

export default contactsRouter;
