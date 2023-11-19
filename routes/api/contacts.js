const express = require("express");

const router = express.Router();

const ContactControllers = require('../../controllers/contacts');

const jsonParser = express.json();

const auth = require("../../middleware/auth");// підключення мідлвари для прочекання токену 


router.get("/",auth, ContactControllers.getContacts);

router.get("/:id",auth, ContactControllers.getContactById);

router.post("/", jsonParser, auth, ContactControllers.postContact);

router.delete("/:id",auth, ContactControllers.deleteContact);

router.put("/:id",auth, jsonParser, ContactControllers.putContact)

router.patch("/:id/favorite", ContactControllers.patchContact);


module.exports = router;
