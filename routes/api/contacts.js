const express = require('express')
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const mySchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

const router = express.Router()


router.get('/', async (request, response, next) => {
 try{
  const contact = await listContacts()
  response.status(200).json(contact)
 } catch(error){
  next(error)
 }
})

router.get("/:contactId", async (request, response, next) => {
  try {
    const contact = await getContactById(request.params.contactId);
    if (!contact) {
      return response.status(404).json({ message: "Not found" });
    }
    response.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try{
    const {error} = mySchema.validate(request.body);
    if (error){
      response.status(400).json({message: "specify the request field"})
    }
    const contact = await addContact(request.body)
    response.status(201).json(contact)
  } catch(error){
    next (error)
  }
})

router.delete('/:contactId', async (request, response, next) => {
  try{
    const contact = await removeContact(request.params.contactId)
    if(!contact){
      return response.status(404).json({message: "not found"})
    }
    response.status(200).json({message: "successfuly deleted"})
  } catch (error){
    next(error)
  }
})

router.put('/:contactId', async (request, response, next) => {
  try{
    const {error} = mySchema.validate(request.body)
    if(error) {
      response.status(400).json({message: "specify the request field"})
    }
    const contact = await updateContact(request.params.contactId, request.body)
    response.status(200).json(contact)
  } catch(error){
    next(error)
  }
})

module.exports = router
