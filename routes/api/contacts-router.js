import express from "express";

import contactsControllers from "../../controllers/contacts-controllers.js";

import contactsSchemas from "../../schema/contacts-schemas.js";
import { validateBody } from "../../decorators/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:id", contactsControllers.getById);

contactsRouter.post(
  "/",
  validateBody(contactsSchemas.constactsAddSchema),
  contactsControllers.add
);

contactsRouter.delete(
  "/:id",
  validateBody(contactsSchemas.constactsAddSchema),
  contactsControllers.deleteById
);

contactsRouter.put("/:id", contactsControllers.updateById);

export default contactsRouter;
