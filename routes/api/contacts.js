const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
router.get("/", ctrl.getAll);

const { validate } = require("../../middlewares");
const { validateSchema } = require("../../schemas");

router.get("/:contactId", ctrl.getById);

router.post("/", validate(validateSchema), ctrl.add);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", validate(validateSchema), ctrl.updateById);

module.exports = router;
