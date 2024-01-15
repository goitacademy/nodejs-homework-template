import express from "express";
import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody } from "../../middlewares/index.js";

const contactsRouter = express.Router();


contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post("/", isEmptyBody, contactsController.add);

contactsRouter.put("/:contactId", isEmptyBody, contactsController.updateById)

contactsRouter.delete("/:contactId", contactsController.deleteById)



export default contactsRouter;
