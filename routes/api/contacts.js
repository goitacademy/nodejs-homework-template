const express = require("express");
const ctrls = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");
const router = express.Router();

router.get("/", ctrls.getAllContacts);

router.get("/:id", ctrls.getContact);

router.post("/", validateBody(schemas.addSchema), ctrls.addContact);

router.delete("/:id", ctrls.deleteContact);

router.put("/:id", validateBody(schemas.updateSchema), ctrls.updateContact);

module.exports = router;
