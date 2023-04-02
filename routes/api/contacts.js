require("dotenv").config;
const express = require('express');

const ctrl = require('../../controllers/contacts');

const validateBody = require("../../utils/validateBody");
const isValidId = require("../../middlewares/isValidId");

const { addContactsSchema,
        updateFavoriteSchema,
} = require("../../schemas/contacts");

const router = express.Router();

router.get('/', ctrl.getAll)

router.get('/:id', isValidId, ctrl.getById);

router.post('/', validateBody(addContactsSchema), ctrl.add);

router.delete('/:id', isValidId, ctrl.deleteById);

router.put('/:id', isValidId, validateBody(addContactsSchema), ctrl.updateById)

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;