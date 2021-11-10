const router = require('express').Router()
const { checkValidity, controllerWrapper, authorize } = require('../../middlewares')
const { joiPostPutContactSchema, joiPatchContactSchema, joiPatchStatusContactSchema } = require('../../schemas/joiSchemas')
const { getAllContacts, getOneContactById, postContact, patchContact, putContact, deleteContact } = require('../../controllers/contacts')

router.get('/', authorize, controllerWrapper(getAllContacts))

router.get('/:contactId', authorize, controllerWrapper(getOneContactById))

router.post('/', authorize, checkValidity(joiPostPutContactSchema), controllerWrapper(postContact))

router.patch('/:contactId', checkValidity(joiPatchContactSchema), controllerWrapper(patchContact))

router.put('/:contactId', checkValidity(joiPostPutContactSchema), controllerWrapper(putContact))

router.delete('/:contactId', controllerWrapper(deleteContact))

router.patch('/:contactId/favorite', checkValidity(joiPatchStatusContactSchema), controllerWrapper(patchContact))

module.exports = router
