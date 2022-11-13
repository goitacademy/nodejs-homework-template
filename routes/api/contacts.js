const express = require('express');
const {
  postContactsValidation,
  putContactsValidation,
} = require('../../middlewares/validationMiddleware.js');
const router = express.Router();

const {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
} = require('../../controller');

router.get('/', get);

router.get('/:contactId', getById);

router.post('/', putContactsValidation, create);

router.delete('/:contactId', remove);

router.put(
  '/:contactId',
  putContactsValidation,
  update
);

router.patch(
  '/:contactId/favorite',
  postContactsValidation,
  updateStatus
);

module.exports = router;
