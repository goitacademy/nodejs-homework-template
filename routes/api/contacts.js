const express = require("express");

const ctrl = require("../../controllers/contacts");

const {validateBody} = require("../../middlewares");
const router = express.Router();

const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAll );

// router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

// router.delete("/:contactId", ctrl.deleteContactByID);

// router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateContactByID);

module.exports = router;
