import express from "express";

import ctrl from "../../controllers/contacts.js";

import validateBody from "../../middlewares/validateBody.js";

import schemas from "../../schemas/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAll);

contactsRouter.get("/:contactId", ctrl.getById);

contactsRouter.post("/", validateBody(schemas.contactAddSchema), ctrl.add);

contactsRouter.put("/:contactId", validateBody(schemas.contactAddSchema), ctrl.updateById);

contactsRouter.delete("/:contactId", ctrl.deleteById);


export default contactsRouter;