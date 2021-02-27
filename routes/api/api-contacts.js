const express = require('express');
const router = express.Router();
const ctrl = require('../../controller/contacts');
const validate = require('./validator');

router.get('/', ctrl.getAll).post('/', validate.createContact, ctrl.create);

router
  .get('/:contactId', ctrl.getByid)
  .patch('/:contactId', validate.updateContact, ctrl.update)
  .delete('/:contactId', ctrl.remove);

module.exports = router;
