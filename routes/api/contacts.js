const express = require('express')
const Joi = require('joi');
const alert = require('alert');
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts')

const router = express.Router()

const schema = Joi.object({
  name: Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'pl']}})
  .required(),
  phone: Joi.number()
  .min(9)
})

router.get('/', async (req, res, next) => {
  const contactList = await listContacts();
  try{
    res.json({
      status: 'success',
      code: 200,
      data: {
        contactList
       }
    })
  } catch (error) {
    console.error(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
    const contactById = await getContactById(contactId);
  try{
    res.json({
     status: 'success',
     code: 200,
     data: contactById
})
} catch (error) {
  console.error(error);
}
  })

router.post('/', async (req, res, next) => {
  try{
  const validatedBody = schema.validate(req.body);
  if (validatedBody.error) {
    res.render("error", {
      message: validatedBody.error.message,
      error: { ...validatedBody.error, status: 400}
    });
  } else {
    const addedContact = await addContact(req.body)
    res.json({
      status: 'success',
    code: 201,
    data: addedContact
    })
  }
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params;
  const deletedContact = await removeContact(contactId);
  try{
    res.json({
      status: 'success',
      code: 200,
      data: deletedContact
    })
  } catch(error) {
    console.error(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try{
    const validatedBody = schema.validate(req.body);
  if (validatedBody.error) {
    res.render("error", {
      message: validatedBody.error.message,
      error: { ...validatedBody.error, status: 400}
    });
  } else {
  const contactId = req.params;
  const updatedContact = await updateContact(contactId, req.body)
    res.json({
      status: 'success',
      code: 200,
      data: updatedContact
    })
  }
  } catch(error) {
    console.error(error)
  }
})

module.exports = router
