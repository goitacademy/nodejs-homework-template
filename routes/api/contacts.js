const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas/contacts");

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addNewContact);

router.delete("/:id", ctrl.deleteContact);

router.put("/:id", validateBody(addSchema), ctrl.updateContact);

module.exports = router;
