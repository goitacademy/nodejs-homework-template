const express = require('express');
const { ctrlWrapper } = require('../../middlewares');
const ctrl = require('../../controllers');
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  updateStatusContacts,
  removeContact,
} = require('../../controllers');

const routerContacts = express.Router();
//routerContacts.get('/', getContacts);
routerContacts.get('/', ctrlWrapper(ctrl.getContacts));

//routerContacts.get('/:id', getContactById);
routerContacts.get('/:id', ctrlWrapper(ctrl.getContactById));

//routerContacts.post('/', createContact);
routerContacts.post('/', ctrlWrapper(ctrl.createContact));

//routerContacts.put('/:id', updateContact);
routerContacts.put('/:id', ctrlWrapper(ctrl.updateContact));

//routerContacts.put('/:id/favorite', updateStatusContacts);
routerContacts.put('/:id', ctrlWrapper(ctrl.updateStatusContacts));

//routerContacts.delete('/:id', removeContact);
routerContacts.delete('/:id', ctrlWrapper(ctrl.removeContact));

module.exports = routerContacts;
