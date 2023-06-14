const express = require("express");

const {
  getAll,
  getById,
  add,
  deleteById,
  editById,
} = require("../../controllers");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", add);

router.delete("/:contactId", deleteById);

router.put("/:contactId", editById);

module.exports = router;
