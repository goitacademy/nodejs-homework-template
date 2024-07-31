const express = require("express");
const router = express.Router();

const {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  putContact,
  patchContact,
} = require("../../controllers");

router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.post("/", createContact);
router.put("/:id", putContact);
router.delete("/:id", deleteContact);
router.patch("/:id/favorite", patchContact);
module.exports = router;