import express from "express";
import controllers from "../../controllers/functions.js";
import mdw from "../../middlewares/index.js";
import model from "../../models/Contact.js";
import decorators from "../../decorators/index.js";

const { schemas } = model;

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", mdw.isValidId, controllers.getById);

router.post(
  "/",
  mdw.isEmptyBody,
  decorators.validateBody(schemas.addSchema),
  controllers.addContact
);

router.put(
  "/:contactId",
  mdw.isValidId,
  mdw.isEmptyBody,
  decorators.validateBody(schemas.addSchema),
  controllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  mdw.isValidId,
  mdw.isEmptyBody,
  decorators.validateBody(schemas.addFavoriteSchema),
  controllers.updateStatusContact
);

router.delete("/:contactId", mdw.isValidId, controllers.deleteContact);

export default router;
