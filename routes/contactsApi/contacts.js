const router = require('express').Router()
const { validatePostPutContact, validatePatchContact, validatePatchStatusContact } = require('../../middlewares/validation')
const { getAllContacts, getOneContactById, postContact, patchContact, putContact, deleteContact } = require('../../controllers/contacts')

router.get('/', getAllContacts)

router.get('/:contactId', getOneContactById)

router.post('/', validatePostPutContact, postContact)

router.patch('/:contactId', validatePatchContact, patchContact)

router.put('/:contactId', validatePostPutContact, putContact)

router.delete('/:contactId', deleteContact)

router.patch('/:contactId/favorite', validatePatchStatusContact, patchContact)

module.exports = router
