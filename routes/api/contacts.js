const express = require("express");

const ctrl = require("../../controllers/controllers");
const addSchema = require("../../schemas/schemas");

const { validateBody } = require("../../middlewares/validateBody");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(addSchema.addShema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateBody(addSchema.addShema), ctrl.updateContact);

module.exports = router;
