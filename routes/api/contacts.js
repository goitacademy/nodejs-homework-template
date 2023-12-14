import express from "express";
import controllers from "../../controllers/functions.js";
import isEmptyBody from "../../middlewares/index.js";
import addSchema from "../../schemas/contactsAddSchema.js";
import decorators from "../../decorators/index.js";

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post(
  "/",
  isEmptyBody,
  decorators.validateBody(addSchema),
  controllers.addContact
);

router.delete("/:contactId", controllers.deleteContact);

router.put(
  "/:contactId",
  isEmptyBody,
  decorators.validateBody(addSchema),
  controllers.updateContact
);

export default router;
