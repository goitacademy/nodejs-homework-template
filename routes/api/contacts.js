const express = require("express");
const ctrl = require("../../controllers/contacts");
const schemas = require("../../schemas/contacts");
const router = express.Router();
const { validateBody } = require("../../decorators");

const addContactValidate = validateBody(schemas.contactAddSchema);

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", addContactValidate, ctrl.updateById);

module.exports = router;
