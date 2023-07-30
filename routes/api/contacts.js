const express = require("express");

const router = express.Router();

const { validateBody } = require("../../middelewares");
const schema = require("../../schemas/contacts");

const ctrl = require("../../controllers/contacts");
router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schema.addSchema), ctrl.addNewContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validateBody(schema.addSchema), ctrl.ubdateById);

module.exports = router;