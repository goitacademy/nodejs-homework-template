const { Router } = require("express");

const ctrl = require("../../controllers/contacts");
const { schemas } = require("../../models/contacts");
const { validateBody, isValidId } = require("../../middleware");

const router = Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addContactSchema), ctrl.add);

router.delete("/:id", isValidId, ctrl.deleteById);

router.put(
	"/:id",
	isValidId,
	validateBody(schemas.addContactSchema),
	ctrl.updateById
);

router.patch(
	"/:id/favorite",
	isValidId,
	validateBody(schemas.updateContactStatusByIdSchema),
	ctrl.updateStatusById
);

module.exports = router;