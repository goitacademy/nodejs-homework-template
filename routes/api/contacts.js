const express = require("express");
const validate = require("../../utils/validate");
const {
  getAll,
  getById,
  removeById,
  add,
  updateById,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.delete("/:contactId", removeById);

router.post("/", validate(), add);

router.put("/:contactId", validate(), updateById);

module.exports = router;
