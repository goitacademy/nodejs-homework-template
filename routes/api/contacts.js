const express = require("express");
const router = express.Router();
const Joi = require("joi");
const ctrl = require("../../controllers/contacts");
const { contactShema } = require("../../models/contacts");
const { validateBody, isValidId } = require("../../middlewares/");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});


router.get('/', contactShema.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validateBody(contactsSchema.addSchema), ctrl.add);

router.delete('/:contactId', isValidId, ctrl.deleteById);

router.put("/:contactId", isValidId, validateBody(contactsSchema.addSchema), ctrl.updateById);

router.patch("/:contactId/favorite", isValidId, validateBody(contactShema.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router;
