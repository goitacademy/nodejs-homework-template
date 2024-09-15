const express = require("express");
const router = express.Router();
const {
  fetchAll,
  fetchById,
  insertContact,
  updateContactDetails,
  removeContact,
  updateContactStatus,
} = require("../../controllers/contactController");

router.get("/", fetchAll);
router.get("/:id", fetchById);
router.post("/", insertContact);
router.put("/:id", updateContactDetails);
router.delete("/:id", removeContact);
router.patch("/:id/favorite", updateContactStatus);

module.exports = router;
