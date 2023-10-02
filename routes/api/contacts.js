const express = require("express");

const {
  getContactsList,
  getContactById,
  addNewContact,
  removeContactById,
  updateContactById,
} = require("../../controllers");

const router = express.Router();

const isEmptyBody = require("../../middlewares");
const { validateBody } = require("../../decorators");
const contactAddSchema = require("../../schema");

const contactAddValidate = validateBody(contactAddSchema);

router.get("/", getContactsList);

router.get("/:id", getContactById);

router.post("/", isEmptyBody, contactAddValidate, addNewContact);

router.delete("/:id", removeContactById);

router.put("/:id", isEmptyBody, contactAddValidate, updateContactById);

module.exports = router;
