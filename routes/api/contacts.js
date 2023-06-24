const express = require("express");
const {
  get,
  getById,
  create,
  remove,
  update,
  updateStatusContact,
} = require("../../controllers/contacts");

const {
  contactValidation,
  favoriteValidation,
} = require("../../middlewares/validation.js");

const authMiddleware = require('../../middlewares/authMiddleware.js');

const router = express.Router();

router.get("/", authMiddleware, get);
router.get("/:contactId", authMiddleware, getById);
router.post("/", authMiddleware, contactValidation, create);
router.delete("/:contactId", authMiddleware, remove);

router.put("/:contactId", authMiddleware, contactValidation, update);

router.patch("/:contactId/favorite", authMiddleware, favoriteValidation, updateStatusContact);

module.exports = router;
