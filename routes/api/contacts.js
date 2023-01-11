const Joi = require('joi');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const express = require('express')

const router = express.Router()

const schema = Joi.object({
  name: Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string()
    .pattern(+[0-9])
    .length(14),
});

// const validateContact = (contact) =>{
//   const result =  schema.validate(contact)
//   return result
// }

router.get('/', async (req, res, next) => {
  const response = await listContacts()
  res.json({ status:200, response })
})

router.get('/:contactId', async (req, res, next) => {
  const {contactId} = req.params
  const response = await getContactById(contactId)
  response === null
  ? res.json({ status: 404, message: "Not found" })
  : res.json({ status: 200, response });
})

router.post('/', async (req, res, next) => {
  const {name, email, phone} = req.body
  if (!name || !email || !phone)
  return res.json({ status: 400, message: "Fill in all fields please" });
  const { error } = schema.validate(req.body);
  const response = await  addContact(req.body)
  if (error) {
    res.json({ status: 400, error: error })
  }
  res.json({ status: 200, response })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
    const response = await removeContact(contactId);
    if (response === 0){
      res.json({ status: 404, message: "Not found" })
      }    res.json({ status: 200, response })

})

router.put('/:contactId', async (req, res, next) => {
  const {contactId} = req.params
  const {error} = schema.validate(req.body)
if (error) {
  res.json({ status: 400, error: error })
}
const response = updateContact(contactId)
  response === null
  ? res.json({ status: 404, message: "Not found" })
  : res.json({ status: 200, response });

    
});


module.exports = router
