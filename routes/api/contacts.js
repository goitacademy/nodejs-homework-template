const express = require("express");
// const Joi = require("joi");

// const contactsService = require("../../models/contacts");
const movieControlls = require("../../controllers/contacts-controller");
const router = express.Router();

// const { HttpError } = require("../../helpers");

router.get("/", movieControlls.getAllMovies);

router.get("/:contactId", movieControlls.gerById);

router.post("/", movieControlls.addContact);

router.delete("/:contactId", movieControlls.deleteContact);

router.put("/:contactId", movieControlls.updateContact);

module.exports = router;
