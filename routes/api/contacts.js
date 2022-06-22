const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  add,
  update,
  updateStatusContact,
  remove,
} = require("../../controllers");

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", add);

router.put("/:contactId", update);

router.patch("/:contactId/favorite", updateStatusContact);

router.delete("/:contactId", remove);

module.exports = router;
