const express = require('express')

const router = express.Router()

const { getContact,
  listContactById,
  postContact,
  deleteContact,
  putContact } = require("../../controllers/controller")

const {validationBody} = require ("../../middlewares/validationBody.js")
const { schemaPostContact,
schemaPutContact} = require("../../schema/validationSchema")  

router.get('/', getContact)

router.get('/:contactId', listContactById );

router.post('/', validationBody(schemaPostContact), postContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', validationBody(schemaPutContact), putContact )

module.exports = router