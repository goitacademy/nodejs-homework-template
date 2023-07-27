const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middleweres");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas), ctrl.add);

router.put("/:contactId", validateBody(schemas), ctrl.updateById);

router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
