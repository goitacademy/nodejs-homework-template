const express = require("express");

const router = express.Router();

const {} = require("../../middlewares/isEmptyBody");

const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
} = require("../../controllers/contacts-controller");

router.get("/", listContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", addContactController);

router.delete("/:contactId", removeContactController);

router.put("/:contactId", updateContactController);

module.exports = router;
