const express = require("express");

const router = express.Router();

const ContactControllers = require('../../controllers/contacts');

const jsonParser = express.json();


router.get("/", ContactControllers.getContacts);

router.get("/:id", ContactControllers.getContactById);

router.post("/", jsonParser, ContactControllers.postContact);

router.delete("/:id", ContactControllers.deleteContact);

router.put("/:id", jsonParser, ContactControllers.putContact)

router.patch("/:id/favorite", ContactControllers.patchContact);


module.exports = router;
