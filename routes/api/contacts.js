const express = require('express')
const {ctrlWrapper} = require('../../helpers/ctrlWrapper')
const {contacts: ctrl} = require("../../controllers/")

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', ctrlWrapper(ctrl.add))

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
