const express = require('express')
const ctrl = require("../../controlers/contacts");
const schemas = require("../../schemas/contacts");
const { validateBody } = require("../../middlewares");
const router = express.Router()

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.schema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(schemas.schema), ctrl.updateById);

module.exports = router;
