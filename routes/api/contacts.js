const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateData } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateData(schemas.addSchema), ctrl.add);

router.put("/:contactId", validateData(schemas.addSchema), ctrl.updateById);

router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
