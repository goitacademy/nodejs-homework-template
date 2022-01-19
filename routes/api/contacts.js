const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')

const { validateCreate, validateUpdate} = require ('./validation')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts(); 
  res.json({ contacts })
})

router.get('/:id', async (req, res, next) => {
  const  id  = req.params.id;  
  const contact = await getContactById(id);
  if (!contact) {
    res.status(404).json({ "message": "Not found" })
    return    
  }
  res.json({ contact })
})

router.post('/', validateCreate, async (req, res, next) => {
  const newContact = await addContact(req.body); 
  res.status(201).json(newContact )
})

router.delete('/:id', async (req, res, next) => {
  const  id  = req.params.id; 
  const contactToDelete = await getContactById(id);
  if (!contactToDelete) {
    res.status(404).json({ "message": "Not found" })
    return    
  }
  await removeContact(id);
  res.status(204).json({"message": "contact deleted"})

})

router.put('/:id', validateUpdate, async (req, res, next) => {
  const id = req.params.id;
  const updatedContact = await updateContact (id, req.body)
  if (updatedContact) {
    return res.status(200).json(updatedContact)
  }
  res.status(404).json({ message: 'Not found' })
})

module.exports = router