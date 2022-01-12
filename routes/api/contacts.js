const express = require("express");
const router = express.Router();

const controller = require("../../controllers/contacts");
const validation = require("../../validate/validate");
const contactShema = require("../../schemas/contacts");

const validateContact = validation(contactShema);

router.get("/", controller.getAll);

router.get("/:contactId", controller.getById);

router.post("/", validateContact, controller.add);

router.delete("/:contactId", controller.removeById);

router.put("/:contactId", validateContact, controller.updateById);

module.exports = router;
