/** @format */

const express = require("express");
const router = express.Router();

const controller = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contactsSchema");

router.get("/", controller.onGetAllContacts);

router.get("/:id", controller.onGetContactById);

router.post("/", validateBody(schemas.addSchema), controller.onAddNewContact);

router.delete("/:id", controller.onDeleteContact);

router.put("/:id", validateBody(schemas.addSchema), controller.onUpdateContact);

module.exports = router;
