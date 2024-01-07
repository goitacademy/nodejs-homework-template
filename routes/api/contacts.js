const express = require("express");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:id", ctrl.remove);

router.put("/:contactId", validateBody(schemas.addSchemaPut), ctrl.updateById);

module.exports = router;