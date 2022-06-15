const express = require('express')
const contacts = require('../../models/contacts.json')
const {v4} = require('uuid')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(contacts);
})

router.get('/:id', async (req, res, next) => {
  const {id} = req.params
  const result = contacts.find(item => item.id === id)
  if (!result) {
    res.status(404)
  }
  
  res.json(result)
})

router.post('/', async (req, res, next) => {
  const contact = {...req.body, id: v4()}
  contacts.push(contact)
  res.json(contact).status(201)
})

router.delete('/:id', async (req, res, next) => {
  const {id} = req.params
  const removed =  contacts.filter(item => item.id !== id)
  res.json(removed).status(200)
})

router.put('/:id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
