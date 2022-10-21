const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  add,
  removeById,
  updateById,
  updateFavoriteById,
} = require("../../controllers/contacts");

const authenticate = require("../../middlewares/authenticate");

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, getById);

router.post("/", authenticate, add);

router.delete("/:contactId", authenticate, removeById);

router.put("/:contactId", authenticate, updateById);

router.patch("/:contactId/favorite", authenticate, updateFavoriteById);

module.exports = router;
