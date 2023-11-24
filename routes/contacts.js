import express from "express";
import ctrl from "../controllers/contacts.js";
import { isValidId, validateBody } from "../middlewares/index.js";
import { addSchema, updateFavoriteSchema } from "../models/Contact.js";

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post(
  "/",
  validateBody(addSchema),
  ctrl.addContact
);

router.put(
	"/:id",
  isValidId,
  ctrl.updateContact
);

router.patch(
	"/:id/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", isValidId, ctrl.removeContact);

export default router;
