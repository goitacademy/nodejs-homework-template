const express = require("express");
// const { HttpError } = require("../../helpers");

const router = express.Router();

// const models = require("../../models/contacts");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
} = require("../../controllers/contacts");

router.get("/", getContacts);
router.get("/:contactId", getContact);
router.post("/", createContact);
router.delete("/:contactId", deleteContact);

// router.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

module.exports = router;
