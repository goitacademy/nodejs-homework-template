import * as contactService from '../models/contacts.js';
import HttpError from "../herpers/HttpError.js";
import { contactAddSchema } from "../schemas/contactschema.js";
import { contactUpdateSchema } from "../schemas/contactschema.js"; 
import { controllerWrapper } from "../decorators/index.js";

 async function getAll (req, res){
    const result = await contactService.listContacts();
    res.json(result); 
}

async function getById  (req, res ) { 
    const { contactId } = req.params;
    const result = await contactService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Movie with id=${contactId} not found`);
    }
    res.json(result);  
}

async function postContacts (req, res) {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactService.addContact(req.body);
  res.status(201).json(result);  
}

async function deleteById (req, res) {
    const { contactId } = req.params;
    const result = await contactService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id = ${contactId} not found`);
    } 
     res.json(result)  
} 

async function updateById  (req, res) {
  const { error } = contactUpdateSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message)
  } 
  const { contactId } = req.params;
  const result = await contactService.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`)
  }
  res.json(result);   
}

export default {
    getAll: controllerWrapper(getAll),
    getById: controllerWrapper(getById),
    postContacts: controllerWrapper(postContacts),
    deleteById: controllerWrapper(deleteById),
    updateById: controllerWrapper(updateById),
    
}