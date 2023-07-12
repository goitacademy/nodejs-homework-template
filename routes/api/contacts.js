const express = require('express')
const contactController = require('../../controller/contactController')

const router = express.Router()
const {validateBody, validateFavorite, validateID} = require('../../middlewares/contacts')

router.get('/', contactController.read)

router.get('/:contactId',validateID,contactController.getById)

router.post('/',validateBody,contactController.create )

router.delete('/:contactId', contactController.deleted)

router.put('/:contactId',validateID,validateBody, contactController.update)

router.patch('/:contactId/favorite',validateID,validateFavorite,contactController.updateStatusFavoriteContact);

module.exports = router
