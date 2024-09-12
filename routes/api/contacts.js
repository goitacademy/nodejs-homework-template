const { Router } = require("express");

const ctrl = require("../../contacts/controllers");
const { validateBody } = require("../../middleware");
const { addContactSchema } = require("../../schemas");

const router = Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(addContactSchema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(addContactSchema), ctrl.updateById);

module.exports = router;