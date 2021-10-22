const express = require('express')
const router = express.Router()
const { listContacts, getContactById, addContact, updateContact, removeContact } = require('../../model/index')

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
    if (!data) {
      return res.status(404).json({ status: 'failure, no contact found' })
    }
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
  const { contactId } = req.params
  try {
    const data = await removeContact(contactId)
    if (!data) {
      return res.status(404).json({ status: 'failure, no contact found' })
    }
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

router.patch('/:contactId', async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ status: 'bad request' })
  }
  const { contactId } = req.params
  try {
    const data = await updateContact(contactId, req.body)
    if (!data) {
      return res.status(404).json({ status: 'failure, no contact found' })
    }
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

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const data = await updateContact(contactId, req.body)
    if (!data) {
      return res.status(404).json({ status: 'failure, no contact found' })
    }
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

module.exports = router
