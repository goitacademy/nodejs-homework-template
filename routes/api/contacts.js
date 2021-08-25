const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getById,
  add,
  updateContactById,
  delContactById,
} = require("../../controllers/contacts");

router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", add);

router.delete("/:contactId", delContactById);

router.patch("/:contactId", updateContactById);

module.exports = router;
