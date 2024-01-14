import express from "express";
import ctrl from "../../controllers/contactsController.js";
import {
	isEmptyBody,
	isValidId,
	isEmptyFavorite,
} from "../../middlewares/index.js";
import { addSchema, patchSchema, putSchema } from "../../models/contact.js";
import { validateBody } from "../../decorators/index.js";

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", isEmptyBody, validateBody(addSchema), ctrl.addNewContact);

router.delete("/:id", isValidId, ctrl.deleteContact);

router.put(
	"/:id",
	isEmptyBody,
	isValidId,
	validateBody(putSchema),
	ctrl.updateContactById
);

router.patch(
	"/:id/favorite",
	isEmptyFavorite,
	isValidId,
	validateBody(patchSchema),
	ctrl.updateStatusContact
);

export default router;
