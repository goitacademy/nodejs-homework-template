const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getContactId);

router.post("/", ctrl.postContact);

router.put("/:id");

router.delete("/:id", ctrl.deleteContact);

module.exports = router;
