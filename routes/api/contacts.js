const express = require('express')
const router = express.Router()

const { joiContactSchema, updateFavoriteJoiSchema } = require('../../models/contact')
const { controllerWrapper, validation, authenticate, upload } = require('../../middleware')
const { contacts: ctrs } = require('../../controllers')

router.get('/all', controllerWrapper(ctrs.getAll))
router.get('/', authenticate, controllerWrapper(ctrs.getAllByOwner))
router.get('/:contactId', authenticate, controllerWrapper(ctrs.getContactById))
router.post('/', upload.single('image'), authenticate, validation(joiContactSchema), ctrs.postNewContact)
router.delete('/:contactId', authenticate, controllerWrapper(ctrs.deleteContact))
router.put('/:contactId', authenticate, validation(joiContactSchema), controllerWrapper(ctrs.putContact))
router.patch('/:contactId/favorite', authenticate, validation(updateFavoriteJoiSchema), controllerWrapper(ctrs.updateContactFavorite))
// router.get('/all', authenticate, controllerWrapper(ctrs.getContactsBySearchQuery))

module.exports = router
