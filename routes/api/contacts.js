const express = require("express");
const {
  getContacts,
  getContactByIdController,
  postContact,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactByIdController);

router.post("/", postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
