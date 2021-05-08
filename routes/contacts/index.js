const { json } = require('express')
const express = require('express')
const { reset } = require('nodemon')
const router = express.Router()
const control = require('../../controllers/contacts')
const guard = require('../../helpers/guard');
const role = require('../../helpers/role');
const {Gender} = require('../../helpers/constants');

const {
  validationCreateContact,
  validationUpdateContact,
  validationQueryContact,
  validationUpdateStatusContact,
  validationObjectId } = require('./valid-contact-router');

router
  .get('/', guard, validationQueryContact, control.getAll)
  .post('/', guard, validationCreateContact, control.create)

router.get('/man', guard, role(Gender.MALE), control.onlyMale)
router.get('/woman', guard, role(Gender.FEMALE), control.onlyFemale)
  
router
  .get('/:contactId', guard, validationObjectId, control.getById)
  .put('/:contactId', guard, validationUpdateContact, validationObjectId, control.update)
  .delete('/:contactId', guard, validationObjectId, control.remove)
router.patch('/:contactId/favorite', guard, validationUpdateStatusContact, control.updateStatus)

module.exports = router
