const express = require('express')
const contactsRouter = express.Router()
const {auth} = require('../../models/auth')

const controller= require('../../models/contacts')

function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

contactsRouter.get('/', tryCatchWrapper(auth), tryCatchWrapper(controller.listContacts))

contactsRouter.delete('/:id', tryCatchWrapper(auth), tryCatchWrapper(controller.removeContact))

contactsRouter.post('/', tryCatchWrapper(auth), tryCatchWrapper(controller.addContact))

contactsRouter.get('/:id', tryCatchWrapper(auth), tryCatchWrapper(controller.getContactById))

contactsRouter.put('/:id', tryCatchWrapper(auth), tryCatchWrapper(controller.updateContact))
// PATCH /api/contacts/:contactId/favorite
contactsRouter.patch('/favorite/:id', tryCatchWrapper(auth), tryCatchWrapper(controller.updateFavorite))


module.exports = { contactsRouter, tryCatchWrapper }

