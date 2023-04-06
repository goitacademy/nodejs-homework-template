const express = require("express");

const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  changeContact,
  updateStatusContact,
} = require("../../controllers");
const {
  addContactValidation,
  patchContactValidation,
  updateFavoriteSchema,
} = require("../../schemas");

const router = express.Router();

router.get("/", getContacts);

router.get("/:id", getContactById);

router.post("/", addContactValidation, postContact);

router.delete("/:id", deleteContact);

router.put("/:id", patchContactValidation, changeContact);

router.patch("/:id/favourite", updateFavoriteSchema, updateStatusContact);

module.exports = router;
