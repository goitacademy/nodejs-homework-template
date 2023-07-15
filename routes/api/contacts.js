import express from "express";

import ctrl from "../../controlers/contacts.js";
import { validateBody } from "../../middlewares/index.js";
import contactSchema from "../../schemas/contactSchema.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAll);

contactsRouter.get("/:contactId", ctrl.getByID);

contactsRouter.post("/", validateBody(contactSchema), ctrl.add);

contactsRouter.delete("/:contactId", ctrl.deleteByID);

contactsRouter.put("/:contactId", validateBody(contactSchema), ctrl.updateByID);

export default contactsRouter;
