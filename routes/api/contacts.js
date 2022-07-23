const express = require("express");
const { ctrlContacts } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const validation = require("../../middlewares/validation");

const router = new express.Router();

router.get("/", ctrlWrapper(ctrlContacts.getContacts));

router.get("/:id", ctrlWrapper(ctrlContacts.getContactById));

router.post(
  "/",
  validation.validateAddBody,
  ctrlWrapper(ctrlContacts.addContact)
);

router.delete("/:id", ctrlWrapper(ctrlContacts.deleteContactById));

router.put(
  "/:id",
  validation.validateAddBody,
  ctrlWrapper(ctrlContacts.updateContactById)
);

router.patch(
  "/:id/favorite",
  validation.validateFavoriteBody,
  ctrlWrapper(ctrlContacts.updateContactFavoriteById)
);
module.exports = router;
