const express = require('express')
const router = express.Router()
const Contacts = require('../../../model/index')
const { validateCreateContact, validateUpdateContact } = require('./validation')

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    console.log('contacts', contacts)
    return res.json({
      status: 'success',
      code: 200,
      data: contacts,

    })
  } catch (e) {
    next(e)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data:
          contact,

      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.post('/', validateCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    // console.log(contact)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: contact
    })
  } catch (e) {
    next(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const index = req.params.contactId
    const contact = await Contacts.removeContact(index)
    if (!contact) {
      return res.json({
        status: 'error',
        code: 404,
        message: 'not found',
      })
    }
    return res.json({
      status: 'success',
      code: 200,
      data:
          contact,
    })
  } catch (e) {
    next(e)
  }
})

router.put('/:contactId', validateUpdateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    )
    console.log(contact)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: contact
      })
    } else {
      return res.json({
        status: 'error',
        code: 404,
        message: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})
router.patch('/contactById/favorite', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body
    if (!favorite) {
      return res.json({ message: 'missing field favorite' })
    }
    const data = Contacts.updateStatusContact(contactId, req.body)
    res.status(200).json({ data })
  } catch (e) {
    next(e)
  }
}
)
module.exports = router
