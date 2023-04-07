const express = require("express");
const ctrl = require("../../controllers/contacts")
const {validateBody} = require("../../utils");
const schemas = require("../../schemas/contacts");


const router = express.Router();

router.get("/", ctrl.listContacts)

router.get("/:id", ctrl.getById)

router.post("/", validateBody(schemas.addSchema), ctrl.addContact)

router.put("/:id", validateBody(schemas.updateSchema), ctrl.updateContact)

router.delete("/:id", ctrl.removeContact)

module.exports = router;
