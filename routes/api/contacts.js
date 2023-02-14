const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { validateBody, upload, resize } = require('../../middlewares/index');
const { addContactsSchema, editContactsSchema, favoriteContactschema } = require('../../schemas/contacts');
const {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
  uploadImage,
} = require('../../controllers/contacts.controller');

const routerContacts = express.Router();

routerContacts.get('/', tryCatchWrapper(getContacts));
routerContacts.get('/:id', tryCatchWrapper(getContact));
routerContacts.post('/', validateBody(addContactsSchema), tryCatchWrapper(createContact));
routerContacts.delete('/:id', tryCatchWrapper(deleteContact));
routerContacts.put('/:id', validateBody(editContactsSchema), tryCatchWrapper(updateContact));
routerContacts.patch('/:id', validateBody(favoriteContactschema), tryCatchWrapper(updateStatusContact));
routerContacts.patch('/:id/avatarURL', upload.single('avatarURL'), resize(250, 250), tryCatchWrapper(uploadImage));

module.exports = {
  routerContacts,
};
