const express = require('express')
const contactController = require('../../controller/contactController')
const joiConfig = require('../../validations/joiconfig');
const router = express.Router()
const {validateBody, validateFavorite, validateID} = require('../../middlewares/contacts')
const authenticate = require('../../middlewares/authenticate');



router.get('/', contactController.read)

router.get('/:contactId',authenticate,validateID,contactController.getById)

router.post('/',validateBody(joiConfig),contactController.create )

router.delete('/:contactId',authenticate, contactController.deleted)

router.put('/:contactId',authenticate,validateID,validateBody(joiConfig), contactController.update)

router.patch('/:contactId/favorite',authenticate,validateID,validateFavorite,contactController.updateStatusFavoriteContact);

module.exports = router
