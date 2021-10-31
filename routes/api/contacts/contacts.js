const express = require('express')

const router = express.Router()
const { NotFound, BadRequest } = require('http-errors')
const contactsOperations = require('../../../model/contacts')
const Joi = require('joi')

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.number().required(),
})
/* 1.Get all contacts.
   2.Get contact by id
   3.Add new contact
   4.Delete contact by id
   5.Update contact by id
*/

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.getAllContacts()
    res.json({ contacts })
  } catch (error) {
    // res.status(500).json({
    //   status: 'error',
    //   code: 500,
    //   message: 'server error',
    // })

    // If the error handler has 4 arguments, then express will pass it to the 1st
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await contactsOperations.getContactById(id)
    if (!contact) {
      throw new NotFound(`Contact with id ${id} not found`)

      // 2
      // const error = new Error(`Contact with id ${id} not found`)
      // error.status = 404
      // throw error
      // 3
      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: `Contact with id ${id} not found`,
      // })
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        contact,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const { error } = joiSchema.validate(body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const newContact = await contactsOperations.addContact(body)

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { newContact },
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { body } = req
    const { id } = req.params
    const { error } = joiSchema.validate(body)
    if (error) {
      throw new BadRequest(error.message)
    }

    const result = await contactsOperations.updateContactById(id, body)
    if (!result) {
      throw new NotFound(`Contact with id ${id} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contactsOperations.removedContact(id)
    if (!result) {
      throw new NotFound(`Contact with id ${id} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
