const express = require('express')
const CreateError = require("http-errors")
const {Contact} = require("../../models")
const {joiSchema} = require("../../models/contacts")
const router = express.Router()


router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find()
    res.json(contacts)
  } catch(error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const {id} = req.params;
  try {
    const contact = await Contact.findById(id)
      if(!contact) {
        throw new CreateError(404, "Not found");
      }
    res.json(contact)
  } catch(error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newContactData = req.body
    const {error} = joiSchema.validate(newContactData)
      if(error) {
        throw new CreateError(400, "missing required name field")
      }
    const newContact = await Contact.create(newContactData)
    res.status(201).json(newContact)
  } catch(error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const contactToDelete = await Contact.findByIdAndRemove(id)
      if(!contactToDelete) {
        throw new CreateError(404, "Not found");
      }
    res.json({message: "contact deleted"})
  } catch(error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const update = req.body
  try {
    const {error} = joiSchema.validate(update)
      if(error) {
        throw new CreateError(400, "missing fields")
      }
    const {id} = req.params
    const contactToUpdate = await Contact.findByIdAndUpdate(id, update, {new: true})
      if(!contactToUpdate) {
        throw new CreateError(404, "Not found");
      }
    res.json(contactToUpdate)
  } catch(error) {
    next(error)
  }
})

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const {id} = req.params
    const {favorite} = req.body
    const contactToUpdate = await Contact.findByIdAndUpdate(id, favorite, {new: true })
      if(!contactToUpdate) {
        throw new CreateError(404, "Not found");
      }
    res.json(contactToUpdate)
  } catch(error) {
      next(error)
  }
})

module.exports = router