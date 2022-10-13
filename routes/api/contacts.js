const express = require("express");
const {
  getAll,
  getById,
  removeItem,
  updateItem,
  addItem,
} = require("../../controllers/controllers");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", addItem);

router.delete("/:contactId", removeItem);

router.put("/:contactId", updateItem);

module.exports = router;
