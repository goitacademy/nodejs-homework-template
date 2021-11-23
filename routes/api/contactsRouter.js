const conatctBodyValidation = require("../../middlewares/validation/contactBodyValidation");
const express = require("express");
const router = express.Router();
const {
  getContactsList,
  getContactByIdHandler,
  postContact,
  deleteContact,
  putContact,
} = require("../../common");

router.get("/", getContactsList);
router.get("/:contactId", getContactByIdHandler);

router.post("/", conatctBodyValidation, postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", conatctBodyValidation, putContact);

module.exports = router;
