const express = require('express');
const router = express.Router();

const { NotFound, BadRequest } = require('http-errors');

const { schemaAdd, schemaUpdate, schemaUpdateFavorite } = require('../../model/contacts/joi-schemas');

const {Contact} = require('../../model');



router.get('/', async (req, res, next) => {
  try {     
    const contacts = await Contact.find();    
    res.json(contacts)   
 } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    } 
    res.json(contact);
    
    
  } catch (error) {
    
    if (error.message.includes('Cast to ObjectId')) {
      error.status = 404
      
    }
    next(error);
  }
});
  

router.post('/', async (req, res, next) => {
  try {    
    const body = req.body;    
    
     const { error } = schemaAdd.validate(body)
     if (error) {
      throw new BadRequest(error.message)
    }
   
     if (!Object.keys(body).includes('favorite')) {
       body.favorite = false;        
    }
    const contact = await Contact.create(body);  
     res.status(201).json(contact)

  } catch (error) {
    if (error.message.includes('validation failed')) {
      error.status = 400
    }

    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  
  try {
    const contact = await Contact.findByIdAndRemove(contactId);    
    if (!contact) {
      res.status(404).json({ message: 'Not found' })       
    }    
      res.json({ message: 'contact deleted' })
    
     } catch (error) {
    next(error);
  }  
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;  
  const body = req.body;    
  const result = schemaUpdate.validate(body);
  
  try {
  if (result.error) {
      return res.status(400).json({ message: 'missing  fields' }) 
    }
    const contact = await Contact.
      findByIdAndUpdate(contactId, body, {new: true});  
     res.status(200).json(contact)

  } catch (error) {
    if (error.message.includes('Cast to ObjectId')) {
      error.status = 404;
    }
    next(error);
  }  
  
})

router.patch('/:contactId/favorite', async (req, res, next) => {
 
  const { contactId } = req.params;   
  const body = req.body;  
  const result = schemaUpdateFavorite.validate(body);
  console.log(body.favorite)
  try {
  if (result.error) {
      return res.status(400).json({ message: 'missing  fields favorite' }) 
    }
    const contact = await updateStatusContact(contactId, body)
    res.json(contact)
    
  } catch (error) {
    if (error.message.includes('Cast to ObjectId')) {
      error.status = 404;
    }
    next(error);
  }
})

async function updateStatusContact (contactId, body) {
  const contact = await Contact.findByIdAndUpdate(contactId, body, { new: true })
  if (!contact) {
    throw new NotFound()
  }
  return contact
}

module.exports = router;
