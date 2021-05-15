const express = require('express')
const router = express.Router()
const { HttpCode } = require('../../helpers/constants')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../../model/index')
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatus,
} = require('../../validation/validate-contacts')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contacts },
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    console.log(req.params.contactId)
    console.log(contact)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found',
        data: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.post('/', validateCreateContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body)
    if (contact) {
      return res.status(HttpCode.CREATED).json({
        status: 'success',
        code: HttpCode.CREATED,
        data: { contact },
      })
    } else {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: 'missing required name field',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        message: 'contact deleted',
        code: HttpCode.OK,
        data: { contact },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found',
        data: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.patch('/:contactId', validateUpdateContact, async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found',
        data: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.patch(
  '/:contactId/favorite',
  validateUpdateStatus,
  async (req, res, next) => {
    if (Object.keys(req.body).length !== 0) {
      try {
        const contact = await updateStatusContact(
          req.params.contactId,
          req.body
        )
        if (contact) {
          return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: { contact },
          })
        } else {
          return next({
            status: HttpCode.NOT_FOUND,
            message: 'Not found',
            data: 'Not found',
          })
        }
      } catch (e) {
        next(e)
      }
    } else {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: 'missing field favorite',
        data: 'missing field favorite',
      })
    }
  }
)

module.exports = router
