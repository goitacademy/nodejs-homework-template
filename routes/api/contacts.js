const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  getContact,
  postContact,
  delContact,
  putContact,
} = require("../../controllers/controllers.js");

const { addValidation } = require("../../middlewares/validationMiddleware");

router.get("/", getAllContacts);

router.get("/:contactId", getContact);

router.post("/", addValidation, postContact);

router.delete("/:contactId", delContact);

router.put("/:contactId", addValidation(putContact));

module.exports = router;
