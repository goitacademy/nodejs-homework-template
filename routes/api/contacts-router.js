import express from "express";
import ctrl from "../../controllers/contacts.js";
import { validateBody } from "../../middlewares/index.js";
import schemas from "../../schemas/contacts.js";
const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAll);

contactsRouter.get("/:id", ctrl.getBiId);

contactsRouter.post(
	"/",
	// (req, res, next) => {
	// 	const { error } = schemas.validate(req.body);
	// 	if (error) {
	// 		next(HttpError(400, error.message));
	// 	}
	// 	next();
	// },
	validateBody(schemas.addSchema),
	ctrl.add,
);

contactsRouter.delete("/:id", ctrl.deleteBiId);

contactsRouter.put("/:id", validateBody(schemas.addSchema), ctrl.updateBiId);

export default contactsRouter;
