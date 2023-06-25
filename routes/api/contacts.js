const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewars");

const shemas = require("../../shemas/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(shemas.addShema), ctrl.addContact);

router.put("/:contactId", validateBody(shemas.addShema), ctrl.updateContact);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
