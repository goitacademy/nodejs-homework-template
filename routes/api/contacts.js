const express = require("express");
import {
  createContacts,
  indexContacts,
  deleteContacts,
  showContacts,
  updateContacts,
} from "../controllers/index.js";
const {
  contactPutSchema,
  contactPostSchema,
  contactFavoriteSchema,
} = require("../../validate");

const router = express.Router();

router.get("/", indexContacts);
router.get("/:id", showContacts);
router.patch("/:id/favorite", contactFavoriteSchema, favorite);
router.post("/", contactPostSchema, createContacts);
router.put("/:id", contactPutSchema, updateContacts);
router.delete("/:id", deleteContacts);

module.exports = router;
