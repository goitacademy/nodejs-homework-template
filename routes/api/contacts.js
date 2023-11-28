const express = require('express');


const ctrl = require("../../controllers");
const addSchema = require("../../schemas");

const { validateBody } = require("../../validateBody")


const router = express.Router();


router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(addSchema.addShema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateBody(addSchema.addShema), ctrl.updateContact);

module.exports = router;
