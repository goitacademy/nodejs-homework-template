const express = require("express");


const {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", add);

router.put("/:contactId", updateById);

router.delete("/:contactId", deleteById);

module.exports = router;
