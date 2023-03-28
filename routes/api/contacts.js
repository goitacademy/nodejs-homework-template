const express = require('express')

const { validation } = require('../../middlewares/validation');
const { control } = require('../../middlewares/control');
const { schema, schemaUpdate, updateFavoriteSchema } = require('../../schemas/joiSchema');
const {
  getContactsList,
  getContact,
  deleteContact,
  addContact,
  changeContact,
  updateStatus,
} = require('../../controllers/index');
const router = express.Router();

router.get('/', control(getContactsList));

router.get('/:contactId', control(getContact));
router.post('/', validation(schema), control(addContact));
router.delete('/:contactId', control(deleteContact));
router.put('/:contactId', validation(schemaUpdate), control(changeContact));
router.patch('/:contactId/favorite', validation(updateFavoriteSchema), control(updateStatus));
module.exports = router;
