const express = require('express')
const router = express.Router()
const actions = require('../../model')

router.get('/', async (req, res, next) => {
  const data = await actions.listContacts()
  try {
    return res.status(200).json({
      data,
      message: 'data loaded'
    })
  } catch (err) {
    return res.status(400).json({
      message: 'data is empty'
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const data = await actions.getContactById(req.params.contactId)
    if (data) {
      return res.status(200).json({
      data,
      message: 'data loaded'
    })
    } else {
    return res.status(404).json({
      message: "Not found"
    })
    }
  } catch (err) {
    
  }
})

router.post('/', async (req, res, next) => {
  try {
    const data = await actions.addContact(req.body)
    return res.status(201).json({
      data,
      message: 'data loaded'
    })
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "missing required name field"
    })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
