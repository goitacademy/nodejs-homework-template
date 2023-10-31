const express = require("express");

const controller = require("../../controllers/contacts")

const router = express.Router();

const { validateBody } = require("../../middlewares")
const schemas = require("../../schemas/contacts")

router.get("/", controller.listContacts );

router.get("/:contactId", controller.getContactById );

router.post("/", validateBody(schemas.addSchema), controller.addContact);

router.delete("/:contactId", controller.removeContact );

router.put("/:contactId", validateBody(schemas.addSchema),controller.updateContactById );

module.exports = router;
