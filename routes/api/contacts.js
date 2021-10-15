const express = require('express')
const router = express.Router()

const { joiContactSchema, updateFavoriteJoiSchema } = require('../../models/contact')
const { controllerWrapper, validation, authenticate, upload } = require('../../middleware')
const { contacts: ctrs } = require('../../controllers')

router.get('/all', controllerWrapper(ctrs.getAll))
router.get('/', authenticate, controllerWrapper(ctrs.getAllByOwner))
router.get('/:contactId', controllerWrapper(ctrs.getContactById))
router.post('/', upload.single('image'), authenticate, validation(joiContactSchema), ctrs.postNewContact)
router.delete('/:contactId', controllerWrapper(ctrs.deleteContact))
router.put('/:contactId', validation(joiContactSchema), controllerWrapper(ctrs.putContact))
router.patch('/:contactId/favorite', validation(updateFavoriteJoiSchema), controllerWrapper(ctrs.updateContactFavorite))
router.get('/all?favorite=true', controllerWrapper(ctrs.getFavoriteContacts))

module.exports = router
