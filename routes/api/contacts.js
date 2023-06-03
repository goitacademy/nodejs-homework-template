const express = require('express');

const {getAllContacts, getContactById, addContact, removeContactById, updateContactById, updateFavorite} = require("../../controllers/contacts-ctrls");

const isValidId  = require("../../middleware");

const router = express.Router();


router.get("/", getAllContacts);

router.get("/:id",isValidId, getContactById);

router.post("/", addContact);

router.delete("/:id", isValidId, removeContactById);

router.put("/:id", isValidId, updateContactById);

router.patch("/:id/favorite", isValidId, updateFavorite);

module.exports = router;
