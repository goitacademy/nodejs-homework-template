import express from "express";
import ctrl from "../../controllers/contacts.js";
import { validateBody } from "../../decorators/index.js";
import {
	authenticate,
	isEmptyBody,
	isValidId,
} from "../../middlewares/index.js";
import contactSchemas from "../../schemas/contacts.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ctrl.getAll);

contactsRouter.get("/:id", isValidId, ctrl.getBiId);

contactsRouter.post(
	"/",
	isEmptyBody,
	validateBody(contactSchemas.contactsAddSchema),
	ctrl.add,
);
contactsRouter.put(
	"/:id",
	isValidId,
	isEmptyBody,
	validateBody(contactSchemas.contactsAddSchema),
	ctrl.updateBiId,
);
contactsRouter.patch(
	"/:id/favorite",
	isValidId,
	isEmptyBody,
	validateBody(contactSchemas.contactUpdateFavoriteSchema),
	ctrl.updateStatusContact,
);
contactsRouter.delete("/:id", isValidId, ctrl.deleteBiId);
export default contactsRouter;
