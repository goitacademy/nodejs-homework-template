import express from "express";
import { ctrlWrapper, validateBody } from "../../decorators/index.js";
import {
	isEmptyBody,
	isValidId,
	isEmptyFavorite,
	authenticate,
} from "../../middlewares/index.js";
import { addSchema, patchSchema, putSchema } from "../../models/contact.js";

import {
	addNewContact,
	deleteContact,
	getAllContacts,
	getById,
	updateContactById,
	updateStatusContact,
} from "../../controllers/contactsController.js";

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(getAllContacts));

router.get("/:id", authenticate, isValidId, ctrlWrapper(getById));

router.post(
	"/",
	authenticate,
	isEmptyBody,
	validateBody(addSchema),
	ctrlWrapper(addNewContact)
);

router.delete("/:id", isValidId, ctrlWrapper(deleteContact));

router.put(
	"/:id",
	authenticate,
	isEmptyBody,
	isValidId,
	validateBody(putSchema),
	ctrlWrapper(updateContactById)
);

router.patch(
	"/:id/favorite",
	authenticate,
	isEmptyFavorite,
	isValidId,
	validateBody(patchSchema),
	ctrlWrapper(updateStatusContact)
);

export default router;
