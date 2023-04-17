const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateAdd } = require("../../middlewares");
const { validateUpdate } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateAdd(schemas.addSchema), ctrl.add);

router.put("/:id", validateUpdate(schemas.addSchema), ctrl.updateById);

router.delete("/:id", ctrl.deleteById);

module.exports = router;
