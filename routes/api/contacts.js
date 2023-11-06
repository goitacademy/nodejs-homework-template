import express from "express";

import * as validators from "#validators/index.js";
import * as controllers from "#controllers/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", controllers.indexContacts);
contactsRouter.get("/:id", controllers.showContacts);
contactsRouter.patch(
  "/:id/favorite",
  validators.contactFavoriteSchema,
  controllers.updateStatusContacts
);
contactsRouter.post(
  "/",
  validators.contactPostSchema,
  controllers.createContacts
);
contactsRouter.put(
  "/:id",
  validators.contactPutSchema,
  controllers.updateContacts
);
contactsRouter.delete("/:id", controllers.deleteContacts);

export { contactsRouter };
