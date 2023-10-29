const express = require("express");
const {
  getAllContacts,
  getById,
  deleteById,
} = require("../../controller/controllers");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", deleteById);

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
