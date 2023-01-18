const schema = require("../../schemas/addContactValidate.js");
const express = require("express");
const {
  getContactControllers,
  getContactByIdControllers,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers");
const { addContactValidate } = require('../../schemas')
const { validateContactBody} = require('../../middlewares/validateContact')

const router = express.Router();

router.get("/", getContactControllers);

router.get("/:contactId", getContactByIdControllers);

router.post("/", addContactController, validateContactBody(addContactValidate));

router.delete("/:contactId", removeContactController);

router.put("/:contactId", updateContactController, validateContactBody(addContactValidate));

router.patch("/:contactId/favorite", updateStatusContactController, validateContactBody(addContactValidate));

module.exports = router;