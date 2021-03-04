const express = require('express')
const router = express.Router()
const Contacts = require('../../model/index')
const { HttpCode } = require('../../helpers/constants')
const validate = require('../../services/validation')

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'Success',
      code: HttpCode.SUCCESS,
      message: 'Contacts found',
      data: {
        contacts,
      },
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
        status: 'Success',
        code: HttpCode.SUCCESS,
        message: 'Contact found',
        data: {
          contact,
        },
      })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'Error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.post('/', validate.createContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    return res.status(201).json({
      status: 'Success',
      code: 201,
      message: 'Contact successfully created',
      data: {
        contact,
      },
    })
  } catch (e) {
    next(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'Success',
        code: HttpCode.SUCCESS,
        message: 'Contact deleted',
        data: {
          contact,
        },
      })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'Error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.patch('/:contactId', validate.updateContact, async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'Error',
        code: HttpCode.BAD_REQUEST,
        message: 'Bad request',
      })
    }
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
    )
    if (contact) {
      return res.json({
        status: 'Success',
        code: HttpCode.SUCCESS,
        message: 'Contact updated successfully',
        data: {
          contact,
        },
      })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'Error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

module.exports = router
