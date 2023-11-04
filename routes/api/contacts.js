const express = require("express");
const {
  createContacts,
  deleteContacts,
  indexContacts,
  showContacts,
  updateContacts,
  updateStatusContacts,
} = require("../../controller");
const {
  contactPutSchema,
  contactPostSchema,
  contactFavoriteSchema,
} = require("../../validate");

const router = express.Router();

router.get("/", indexContacts);
router.get("/:id", showContacts);
router.patch("/:id/favorite", contactFavoriteSchema, updateStatusContacts);
router.post("/", contactPostSchema, createContacts);
router.put("/:id", contactPutSchema, updateContacts);
router.delete("/:id", deleteContacts);

module.exports = router;
