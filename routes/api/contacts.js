const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/controllers");

const { updateSchema } = require("../../utils/schema/schema");
const { updateContactValidate } = require("../../middlewars/validate");

router.get("/", ctrl.getContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.put("/:id", ctrl.updateContact);

router.delete("/:id", updateContactValidate(updateSchema), ctrl.deleteContact);

module.exports = router;
