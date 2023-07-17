import express from "express";
import ctrl from "../../controllers/contacts.js";
import { validateBody } from "../../middlewares/index.js";
import contactSchemas from "../../schemas/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAll);

contactsRouter.get("/:id", ctrl.getBiId);

contactsRouter.post(
	"/",
	validateBody(contactSchemas.contactsAddSchema),
	ctrl.add,
);

contactsRouter.delete("/:id", ctrl.deleteBiId);

contactsRouter.put(
	"/:id",
	validateBody(contactSchemas.contactsAddSchema),
	ctrl.updateBiId,
);

export default contactsRouter;
