const express = require("express");
const ctrl = require("../../controllers/contacts");

const validateBody = require("../../midlewares/validateBody");

const addSchema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAllContacts);
router.get("/:id", ctrl.getById);
router.post("/", validateBody(addSchema), ctrl.addContact);
router.delete("/:contactId", ctrl.deleteContact);
router.put("/:contactId", validateBody(addSchema), ctrl.updateContact);

module.exports = router;
