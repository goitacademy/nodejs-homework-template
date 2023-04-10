const express = require("express");
const {
  getList,
  getById,
  add,
  removeById,
  updateById,
} = require("../../controllers/contacts");
const router = express.Router();

router.get("/", getList);

router.get("/:contactId", getById);

router.post("/", add);

router.delete("/:contactId", removeById);

router.put("/:contactId", updateById);

module.exports = router;
