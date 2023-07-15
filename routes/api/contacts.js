const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
} = require("../../controllers/conrollers");

router.get("/", getContacts);

router.get("/:id", getContactById);

router.post("/", postContact);

router.delete("/:id", deleteContact);

router.put("/:id", putContact);

module.exports = router;
