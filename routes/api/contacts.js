const express = require('express');

const router = express.Router();

const {
  getAll,
  getById,
  add,
  updateById,
  updateStatusContact,
  deleteById,
} = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get('/', authenticate, getAll);

router.get('/:contactId', authenticate, isValidId, getById);

router.post('/', authenticate, validateBody(schemas.addSchema), add);

router.delete('/:contactId', authenticate, isValidId, deleteById);

router.put('/:contactId',  authenticate, isValidId, validateBody(schemas.addSchema), updateById);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  updateStatusContact
);

module.exports = router;
