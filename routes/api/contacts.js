const express = require('express')
const contactController = require('../../controller/contactController')
const joiConfig = require('../../validations/joiconfig');
const router = express.Router()
const {validateBody, validateFavorite, validateID} = require('../../middlewares/contacts')




router.get('/', contactController.read)

router.get('/:contactId',validateID,contactController.getById)

router.post('/',validateBody(joiConfig),contactController.create )

router.delete('/:contactId', contactController.deleted)

router.put('/:contactId',validateID,validateBody(joiConfig), contactController.update)

router.patch('/:contactId/favorite',validateID,validateFavorite,contactController.updateStatusFavoriteContact);

module.exports = router
