const express = require('express')
const Joi = require('joi')

const contacts =require('../../models/contacts')
const {HttpError} = require('../../helpers')

const router = express.Router();

const schema =Joi.object({
  name: Joi.string()
       .alphanum()
       .min(3)
       .max(30)
       .required(),

  email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
  
  phone: Joi.string()
      .min(13)
      .pattern(
            /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
            )
      .required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
  res.json(result);
  } catch (error) {
    next(error)
  }
  
})

router.get('/:id', async (req, res, next) => {
 try {
  const {id} =req.params;
  const result =await contacts.getContactById(id)
  if(!result) { 
  throw HttpError (404, 'Not Found');
  }
  res.json(result);
 } catch (error) {
  next(error)
 }
})

router.post('/', async (req, res, next) => {
  try {
const {error} =schema.validate(req.body);
if(error){
  throw HttpError(400,  "missing required name field")
}
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
try {
  const {id} =req.params;
  const result = await contacts.removeContact(id);
  if(!result) { 
    throw HttpError (404, 'Not Found');
    }
    res.json({
      message: "contact deleted"
    })
} catch (error) {
  
}
})

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
