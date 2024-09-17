const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/controllers");

const { updateSchema, addSchema } = require("../../utils/schema/schema");
const { validateBody } = require("../../middlewars/validate");

router.get("/", ctrl.getContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.put("/:id", validateBody(updateSchema), ctrl.updateContact);

router.delete("/:id", ctrl.deleteContact);

module.exports = router;
