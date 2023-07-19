const express = require("express");
const {
  getAll,
  getById,
  postContact,
  deleteContact,
  update,
} = require("../../controllers/contacts-controllers.js");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", update);

module.exports = router;
