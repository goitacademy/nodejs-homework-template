const express = require('express')

const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../midlewares");
const { contactsSchema } = require("../../schemas/contactsSchema");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(contactsSchema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(contactsSchema), ctrl.upDateById);

module.exports = router 
