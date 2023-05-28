const express = require("express");

const router = express.Router();

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateById);

router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
