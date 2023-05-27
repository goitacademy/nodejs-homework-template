const express = require('express');
const utils = require("../../utils/index");
const contacts = require("../../models/contacts");


const router = express.Router()



router.get('/', async (req, res, next) => {
  try {
     const result = await contacts.listContacts();
    
    if (!result) {
        throw utils.HttpError(404, "Not Found");  
    }
    
     res.json(result); 
    }
   catch (error) {
      next(error)
    }  
})



router.get('/:id', async (req, res, next) => { 
  try {
     const {id} = req.params
     const result = await contacts.getContactById(id);

     if (!result) {
       throw utils.HttpError(404, "Not Found");
     }

     res.json(result);
   } 
    catch (error) {
    next(error)
  }
})



router.post('/', async (req, res, next) => {
     try {
       const { error } = utils.contactSchema.validate(req.body);
       
       if (error) {
         throw utils.HttpError(400, "missing required name field");
       }

      const body = req.body;
      contacts.addContact(body);     
      res.status(201).json(body);
     } catch (error) {
         next(error)
      }
})



router.delete('/:id', async (req, res, next) => {
  try {
       const { id } = req.params;
       const result = await contacts.removeContact(id);
    
       if (!result) {
         throw utils.HttpError(404, "Not Found");
       }
    
       res.json({message: "contact deleted"});

     } catch (error) {
         next(error)
      }
})



router.put('/:id', async (req, res, next) => {
  try {
    const { error } = utils.contactSchema.validate(req.body);
    if (error) {
      throw utils.HttpError(400, "missing fields");
    }
      const { id } = req.params;
      const result = await contacts.updateContact(id , req.body);
    
      if (!result) {
        throw utils.HttpError(404, "Not Found");
      }
      console.log(result);
      res.json(result);
      
    } catch (error) {
       next(error)
     }
})

module.exports = router
