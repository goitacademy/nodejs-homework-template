const express = require('express')
const router = express.Router()

const { putContactsValidation, postContactsValidation, favoriteContactScheme } = require('../../middlewares/validationMiddlver');

const {
  getContactsController,
  getIdContactsController,
  putContactsController,
  postContactsController,
  deleteContactsController,
  patchIdContactsController}=require("../../controllers/contactsControllers")
const{asyncWrapper}=require('../../helpers/apiHelpers')



router.get('/',asyncWrapper(getContactsController ) )


router.get('/:contactId', asyncWrapper(getIdContactsController))

router.post('/',postContactsValidation , asyncWrapper(postContactsController))

router.delete('/:contactId', asyncWrapper(deleteContactsController))

router.put('/:contactId',  putContactsValidation, asyncWrapper(putContactsController) )


router.patch('/:contactId/favorite',favoriteContactScheme, asyncWrapper(patchIdContactsController) )
module.exports = router
