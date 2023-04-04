const express = require("express");

//імпортуємо контроллери з окремого файлу який ми створили і винесли їх туди
const ctrl = require("../../controllers/contacts-controllers");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", ctrl.updateContactById);

module.exports = router;
