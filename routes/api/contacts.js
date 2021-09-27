const express = require('express');
const router = express.Router();

const {
  getAll,
  getById,
  deleteById,
  updateById,
  add
} = require('../../controllers/contacts');

const validation = require('../../middlewares/validation');

router.get('/', getAll)
router.get('/:contactId', getById)
router.post('/', validation.postValid, add)
router.delete('/:contactId', deleteById)
router.patch('/:contactId', validation.patchValid, updateById)

module.exports = router
