const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const contactsController = require("../../controllers/contactsController");
const { auth } = require("../../middlewares/auth");
const router = express.Router();

router.get("/", auth, ctrlWrapper(contactsController.getAll));

router.get("/:contactId", ctrlWrapper(contactsController.getById));

router.post("/", auth, ctrlWrapper(contactsController.add));

router.put("/:contactId", ctrlWrapper(contactsController.update));

router.patch(
  "/:contactId/favorite",
  ctrlWrapper(contactsController.updateFavoriteById)
);

router.delete("/:contactId", ctrlWrapper(contactsController.deleteContact));

module.exports = router;
