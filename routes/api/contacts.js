const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

const { validateBody, validateUpdateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put("/:id", validateUpdateBody(schemas.addSchema), ctrl.updateById);

router.delete("/:id", ctrl.deleteById);

module.exports = router;
