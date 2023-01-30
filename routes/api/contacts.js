const express = require("express");
const { ctrlWrapper, validation } = require("../../middleware");

const {
  joiContactSchema,
  favoreiteJoiSchema,
} = require("../../models/contact");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

// необходимо добавить враппер для контроллера
router.get("/", ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(joiContactSchema), ctrlWrapper(ctrl.addContact));

router.put("/:contactId", validation(joiContactSchema), ctrlWrapper(ctrl.updateContact));

router.patch("/:contactId/favorite", validation(favoreiteJoiSchema), ctrlWrapper(ctrl.updateFavoriteContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
