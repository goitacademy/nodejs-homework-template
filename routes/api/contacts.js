const express = require("express");

const router = express.Router();
const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
} = require("../../controllers/contacts");

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", ctrl.add);

router.delete("/:contactId", deleteById);

router.put("/:contactId", updateById);

module.exports = router;
