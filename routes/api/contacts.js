const express = require("express");

const router = express.Router();

const cntrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", cntrl.listContacts);

router.get("/:contactId", cntrl.getContactById);

router.post("/", validateBody(schemas.postSchema), cntrl.addContact);

router.delete("/:contactId", cntrl.removeContact);

router.put("/:id", validateBody(schemas.putSchema), cntrl.updateContact);

module.exports = router;
