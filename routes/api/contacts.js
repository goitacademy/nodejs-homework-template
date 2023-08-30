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

const {
  addSchema, 
  updateStatusContactSchema
}  = require("../../schemas/contacts");

router.get('/', authenticate, getAll);

router.get('/:contactId', authenticate, isValidId, getById);

router.post('/', authenticate, validateBody(addSchema), add);

router.delete('/:contactId', authenticate, isValidId, deleteById);

router.put('/:contactId',  authenticate, isValidId, validateBody(addSchema), updateById);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateStatusContactSchema),
  updateStatusContact
);

module.exports = router;
