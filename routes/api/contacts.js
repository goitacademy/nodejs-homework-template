const express = require("express");

const router = express.Router();
const ctrl = require("../../controlers/contacts");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.schema), ctrl.add);

router.put("/:contactId", validateBody(schemas.schema), ctrl.updateById);

router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
