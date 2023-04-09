const express = require("express");
const ctrl = require("../../controllers/contacts")
const {validateBody} = require("../../utils");
const { schemas } = require("../../models/contacts")


const router = express.Router();

router.get("/", ctrl.listContacts)

router.get("/:id", ctrl.getById)

router.post("/", validateBody(schemas.addSchema), ctrl.addContact)

router.put("/:id", validateBody(schemas.updateSchema), ctrl.updateContact)

router.patch("/:id/favorite", validateBody(schemas.updateStatusSchema), ctrl.updateStatusContact);

router.delete("/:id", ctrl.removeContact)

module.exports = router;
