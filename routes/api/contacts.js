const express = require('express')
const Joi = require("joi");
const {HttpError}  = require("../../helpers");



const router = express.Router()

const contacts = require('../../models/contacts')

const addSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {

  try{
      const result = await contacts.listContacts();
    res.json(result)
  } catch (err){
    res.status(500).json({ message: "server Error" });
  }

})

router.get("/:id", async (req, res, next) => {
  try {
   const{id}=req.params
    const result = await contacts.getContactById(id);
      if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error){
     next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    console.log(error);
     if (error) {
       throw HttpError(400, { message: "missing required name field" });
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error){
    next(error)
}
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contacts.removeContact(id);
    if (!result) {
         throw HttpError(404, "Not found");
    }
    res.json({ message: "Delete success" });
    }
    catch (error) {
   next(error)
 }
})

router.put('/:id', async (req, res, next) => {
 try {
    const { error } = addSchema.validate(req.body);
    console.log(error);
    if (error) {
      throw HttpError(400, { message: "missing fields" });
    }
    const { id } = req.params;
    const result = await contacts.updateByContactId(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router