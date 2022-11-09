const express = require('express');
const contactsControlers = require('../controlers/contactsControlers');
const { autchMiddleware } = require('../middleweras/autchMiddlewares');
const contactsRouter = express.Router();

contactsRouter.use(autchMiddleware)
contactsRouter.get('/', contactsControlers.getAll);
contactsRouter.get('/:id', contactsControlers.findOneById);
contactsRouter.post('/', contactsControlers.create);
contactsRouter.delete('/:id', contactsControlers.deleteById);
contactsRouter.put('/:id', contactsControlers.updateById);
contactsRouter.patch("/:contactId/favorite", contactsControlers.updateStatusContact );

module.exports = {
  contactsRouter,
};