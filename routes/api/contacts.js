const express = require('express')
const { getAll, getById, addNewContact, removeContactById} = require('../../controlers/contacts')

const router = express.Router()

router.get('/', getAll)

router.get('/:contactId', getById)

router.post('/', addNewContact)

router.delete('/:contactId',  removeContactById)

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
