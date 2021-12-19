import express from 'express'
import model from '../../model/index'
const router =  express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await model.listContacts()
  res.status(200).json(contacts)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const contact = await model.getContactById(id)
  if (contact) {
 return res.status(200).json(contact)
  }
  res.status(404).json({message: "not found"})
})

router.post('/', async (req, res, next) => {
  const contacts = await model.addContact(req.body)
  res.status(201).json(contacts)
})

router.delete('/:id', async (req, res, next) => {
  const {id} = req.params
  const contact = await model.removeContact(id)
  if (contact) {
   return res.status(200).json({message :"contact deleted"})
  }
  return res.status(404).json({message: "not found"})
  
})

router.put('/:id', async (req, res, next) => {
 const {id} = req.params
  const contact = await model.updateContact(id, req.body)
  if (contact) {
   return res.status(200).json(contact)
  }
  return res.status(404).json({message: "not found"})
  
})

export default router
