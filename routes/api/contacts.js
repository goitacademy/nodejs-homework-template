const express = require("express");
const ctrl = require("../../controllers/controller");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/joi.schema");

const router = express.Router();

router.get("/", ctrl.getContacts);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.createContact);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateById);

router.delete("/:contactId", ctrl.removeById);

module.exports = router;
