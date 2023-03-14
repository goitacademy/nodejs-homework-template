const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const contactsController = require("../../controllers/contactsController");
const router = express.Router();

router.get("/", ctrlWrapper(contactsController.getAll));

router.get("/:contactId", ctrlWrapper(contactsController.getById));

router.post("/", ctrlWrapper(contactsController.add));

router.put("/:contactId", ctrlWrapper(contactsController.update));

router.patch(
  "/:contactId/favorite",
  ctrlWrapper(contactsController.updateFavoriteById)
);

router.delete("/:contactId", ctrlWrapper(contactsController.deleteContact));

module.exports = router;
