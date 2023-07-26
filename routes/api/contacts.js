const express = require('express')

// const contacts = require("../../models/contacts")


const ctrl = require("../../controllers/contacts")

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contact")

const { ctrlWrapper } = require("../../helpers")

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts))

router.get("/:id", ctrlWrapper(ctrl.getContactById))

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact))

router.put("/:id", validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateContact))

router.delete("/:id", ctrlWrapper(ctrl.removeContact))

module.exports = router;




