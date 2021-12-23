const express = require('express')
const { nanoid } = require('nanoid')
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../model')
const router = express.Router();
const joi = require('joi')

const schema = joi.object({
  id: joi.string(),
  name: joi.string().min(3).max(20),
  email: joi.string().email(),
  phone: joi.string().regex(/^\d{3}-\d{3}-\d{4}$/),
});


router.get('/api/contacts', async (req, res, next) => {
  const contactsData = await listContacts()
  res.status(200).json({
    code: 200,
    data: {
      contacts: [...contactsData],
    },
  })

})

router.get('/api/contacts/:id', async (req, res, next) => {
  const {id} = req.params
  const contact = await getContactById(id)
  if (contact) {
    res.status(200).json({
      code: 200,
      data: {
        contact,
      },
    })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

router.post('/api/contacts', async (req, res, next) => {
  const {name, email, phone} = req.body;
  const contact = {
    id: nanoid(),
    name,
    email,
    phone,
  }
  try {
    await schema.validateAsync(contact);
    if (name && email && phone) {
      const body = await addContact(contact)
      res.status(201).json({
        code: 201,
        data: {body},
      })
    } else {
      res.status(400).json({ message: 'missing required name field' })
    }
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

router.delete('/api/contacts/:id', async (req, res, next) => {
  const {id} = req.params
  const contacts = await getContactById(id)
  if (contacts) {
    await removeContact(id)
    res.status(200).json({
      message: "contact deleted",
    })
  } else {
    res.status(404).json({
      message: "Not found",
    })
  }
})

router.patch('/api/contacts/:id', async (req, res, next) => {
  const {id} = req.params
  const {name, email, phone} = req.body
  const contact = await getContactById(id)
  const newContact = {
    id,
    name: name ? name : contact.name,
    email: email ? email : contact.email,
    phone: phone ? phone : contact.phone,
  }
  try {
    await schema.validateAsync(newContact);
    if (name || email || phone) {
      if (contact) {
        await updateContact(id, newContact)
        res.status(200).json({
          code: 200,
          message: "contact patch",
          newContact,
        })
      } else {
        res.status(404).json({
          message: "Not found",
        })
      }
    } else {
      res.status(400).json({
        message: "missing fields",
      })
    } 
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})


module.exports = router
