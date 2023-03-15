const express = require("express");
const router = express.Router();

const {
  postContactValidation,
  putContactValidation,
} = require("../../middlewares/userMiddlevares");

const {
  getContacts,
  addContact,
  deleteUserById,
  getContactById,
  updateContactById,
} = require("../../controllers/userControllers");

router.get("/", getContacts);
router.post("/", postContactValidation, addContact);
router.delete("/:contactId", deleteUserById);
router.put("/:contactId", putContactValidation, updateContactById);
router.get("/:contactId", getContactById);

module.exports = router;
