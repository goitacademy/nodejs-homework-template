import express from "express";

// import { validateBody } from "../../decorators/index.js";
import { isEmptyBody, isEmptyBodyFav } from "../../middlewars/index.js";

import contactsController from "../../controllers/contacts-controller.js";
// import contactsAddSchema from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  // validateBody(contactsAddSchema),
  contactsController.add
);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  // validateBody(contactsAddSchema),
  contactsController.updateById
);

contactsRouter.delete("/:contactId", contactsController.removeById);
contactsRouter.patch(
  "/:contactId/favorite",
  isEmptyBodyFav,
  contactsController.updateFavorite
);

export default contactsRouter;
