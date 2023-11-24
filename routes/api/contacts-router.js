// const express = require('express')
import express from 'express'
import contactsService from '../../models/contacts.js'
import { addContactSchema, updateContactSchema } from '../../schemas/contactsSchemas.js'
import { HttpError } from '../../helpers/HttpError.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await contactsService.listContacts()
    res.json(data)
  } catch (error) {
    next(error)
  }

})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const data = await contactsService.getContactById(contactId)
    if (!data) {
      throw HttpError(404, 'Not found')
    }
    res.json(data)
  }
  catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const contact = req.body
    const { error } = addContactSchema.validate(contact)
    if (error) {
      throw HttpError(400, error.message)
    }
    const data = await contactsService.addContact(contact)
    res.status(201).json(data)
  }
  catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const data = await contactsService.removeContact(contactId)
    if (!data) {
      throw new Error("Not found")
    }
    res.json({ message: "contact deleted" })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const body = req.body
    const { error } = updateContactSchema.validate(body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const data = await contactsService.updateContact(contactId, body)
    res.json(data)
  }
  catch (error) {
    next(error)
  }
})


export default router
