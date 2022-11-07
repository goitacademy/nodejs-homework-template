const express = require('express')
const router = express.Router()

const controller = require('../../models/contacts')

function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

router.get('/', tryCatchWrapper(controller.listContacts))

router.delete('/:id', tryCatchWrapper(controller.removeContact))

router.post('/', tryCatchWrapper(controller.addContact))

router.get('/:id', tryCatchWrapper(controller.getContactById))

router.put('/:id', tryCatchWrapper(controller.updateContact))
// PATCH /api/contacts/:contactId/favorite
router.patch('/favorite/:id', tryCatchWrapper(controller.updateFavorite))
  

module.exports = router

