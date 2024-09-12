const express = require('express');
const router = express.Router();
const ctr = require('../../controllers/contacts')

const { validateBody } = require("../../middlewares")
const schemas = require("../../schemas/contacts")

router.get("/", ctr.allContacts);

router.get("/:id", ctr.getContactById);

router.post("/", validateBody(schemas.addSchema), ctr.addContact);

router.delete("/:id", ctr.removeContact);

router.put("/:id",validateBody(schemas.addSchema), ctr.updateContact);

module.exports = router