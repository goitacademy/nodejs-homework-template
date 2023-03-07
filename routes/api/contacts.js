const express = require('express');
const router = express.Router();
const { joiContactSchema, updateFavoriteSchema } = require('../../schemas/Joi');
const { validation, isValidId } = require('../../middleware');
const { ctrlWrapper } = require("../../helpers");
const ctrl = require('../../controllers/contacts')

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validation(joiContactSchema), ctrlWrapper(ctrl.addContact));

router.put("/:id", isValidId, validation(joiContactSchema), ctrlWrapper(ctrl.updateContact));

router.patch("/:id/favorite", isValidId, validation(updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact));

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact));

module.exports = router;
