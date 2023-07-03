const express = require("express");

const ctrl = require("../../controllers/contacts");

const {validateBody} = require("../../middleware");

const schemas = require("../../shemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:id", ctrl.deleteById);

router.put("/:id", validateBody(schemas.addSchema),  ctrl.updateById);

module.exports = router;
