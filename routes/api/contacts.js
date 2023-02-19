const express = require("express");
const Joi = require("joi");

const controllers = require("../../controllers/contacts");

const router = express.Router();

router.get("/", controllers.listContacts);

router.get("/:id", controllers.getContactById);

router.post("/", controllers.addContact);

router.delete("/:id", controllers.removeContact);

router.put("/:id", controllers.updateContact);

module.exports = router;
