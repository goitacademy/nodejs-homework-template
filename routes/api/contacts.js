const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewars");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addNew);

router.put("/:contactId", validateBody(schemas.updateSchema), ctrl.updateById);

router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
