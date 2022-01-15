import { Router } from 'express'
import model from '../../model/index'
import { createValidate, updateValidate, idValidate } from './validation'

//const express = require('express')
const router = new Router()

router.get('/', async (req, res, next) => {
  const contacts = await model.listContacts()
  return res.status(200).json(contacts)
})

router.get('/:id', idValidate, async (req, res, next) => {
  const { id } = req.params
  const getContact = await model.getContactById(id)
  if (getContact) {
    return res.status(200).json(getContact)
  }
  return res.status(404).json({ message: 'Not found' })
})

router.post('/', createValidate, async (req, res, next) => {
  if (req.body) {
    const newContact = await model.addContact(req.body)
    return res.status(201).json(newContact)
  }
  return res.status(400).json({ message: 'Missing required name field' })
})

router.delete('/:id', idValidate, async (req, res, next) => {
  const { id } = req.params
  const delContact = await model.removeContact(id)
  if (delContact) {
    return res.status(200).json({ message: 'Contact deleted' })
  }
  return res.status(404).json({ message: 'Not found' })
})

router.patch('/:id', idValidate, updateValidate, async (req, res, next) => {
  const { id } = req.params
  const contact = await model.updateContact(id, req.body)
  if (contact) {
    return res.status(201).json(contact)
  }
  return res.status(404).json({ message: 'Not found' })
})

export default router
