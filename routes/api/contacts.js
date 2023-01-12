const express = require("express");
const {
  ctrlGetContacts,
  ctrlGetContactById,
  ctrlCreateUser,
  ctrlDeleteUser,
  ctrlUpdateUser,
  ctrlUpdateFavorite,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrlGetContacts);

router.get("/:contactId", ctrlGetContactById);

router.post("/", ctrlCreateUser);

router.delete("/:contactId", ctrlDeleteUser);

router.put("/:contactId", ctrlUpdateUser);

router.patch("/:contactId/favorite", ctrlUpdateFavorite);

module.exports = router;
