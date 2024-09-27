const express = require("express");

const router = express.Router();

const controller = require("../../controllers/contacts");

const {validateBody} = require("../../middlewares");

const schemas = require("../../schemas/contacstsSchema")

router.get("/", controller.getAllContacts);

router.get("/:contactId", controller.getContactById);

router.post("/", validateBody(schemas.addSchema), controller.postContact);

router.delete("/:contactId", controller.deleteContact);

router.put("/:contactId", validateBody(schemas.addSchema), controller.putContact);

module.exports = router;
