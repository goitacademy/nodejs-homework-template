const express = require('express');
const contactsControlers = require('../controlers/contacts.controlers');


const contactsRouter = express.Router();

contactsRouter.get('/', contactsControlers.getAll);
contactsRouter.get('/:id', contactsControlers.findOneById);
contactsRouter.post('/', contactsControlers.create);
contactsRouter.delete('/:id', contactsControlers.deleteById);
contactsRouter.put('/:id', contactsControlers.updateById);
contactsRouter.patch("/:contactId/favorite", contactsControlers.updateStatusContact );

module.exports = {
  contactsRouter,
};