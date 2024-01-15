const express = require("express");

const { contacts } = require("../../controllers");
const { Contact } = require("../../models/contact");

const { validateContact, authenticate } = require("../../middlewares");

const router = express.Router();

router.use(authenticate)

router.get("/", contacts.getAll);

router.get("/:favorite", contacts.getAllFavoriteOrNot)

router.get("/:contactId", contacts.getById);

router.post("/", contacts.add);

router.delete("/:contactId", contacts.deletebyId);

router.put("/:contactId", validateContact(Contact), contacts.updateById);

router.patch("/:contactId/favorite", contacts.updateStatusContact);

module.exports = router;