const express = require('express')
const router = express.Router()
const { listContacts, getContactById, addContact } = require('../../model/index')

router.get('/', async (req, res, next) => {
  try {
    const data = await listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: data
      }
    })
  } catch (error) {
    console.log(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const data = await getContactById(contactId)
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: data
      }
    })
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res, next) => {
  // res.json({ message: 'template message' })
  const { name, email, phone } = req.body
  try {
    const data = await addContact({ name, email, phone })
    res.json({
      status: 'success',
      code: 201,
      data: {
        result: data
      }
    })
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
