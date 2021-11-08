const router = require('express').Router()
const checkValidity = require('../../middlewares/validation')
const { joiPostPutContactSchema, joiPatchContactSchema, joiPatchStatusContactSchema } = require('../../schemas/joiSchemas')
const { getAllContacts, getOneContactById, postContact, patchContact, putContact, deleteContact } = require('../../controllers/contacts')

router.get('/', getAllContacts)

router.get('/:contactId', getOneContactById)

router.post('/', checkValidity(joiPostPutContactSchema), postContact)

router.patch('/:contactId', checkValidity(joiPatchContactSchema), patchContact)

router.put('/:contactId', checkValidity(joiPostPutContactSchema), putContact)

router.delete('/:contactId', deleteContact)

router.patch('/:contactId/favorite', checkValidity(joiPatchStatusContactSchema), patchContact)

module.exports = router
