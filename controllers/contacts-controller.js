import { contactAddSchema, contactUpdateSchema } from "../schemas/contacts-schema.js";

import  contactsService from  "../models/contacts.js";

import {HttpError} from "../helpers/index.js"




const getAllContacts = async (req, res, next) => {
    try{
    const result = await contactsService.listContacts()
    res.json(result)
 }
 catch(error){
    res.status(500).json({
        message: error.message,
    })
 }
}

const getByID = async (req, res, next) => {
    try{
    const {contactId} = req.params;
    const result = await contactsService.getContactById(contactId);
    if(!result){
        throw HttpError (404, `Contact with id=${contactId} not found`);
    }
    res.json(result);

}catch(error){
    next(error);
}
  }

const add = async (req, res, next) => {
 try {
    const {error} = contactAddSchema.validate(req.body);
    if (error){
        throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);

    res.status(201).json(result);

 } catch (error) {
    next(error)
 }
}

const updateById = async(req, res, next)=>{
 try {
    const {error} = contactUpdateSchema.validate(req.body);
    if (error){
        throw HttpError(400, error.message);
    }
    const {id} = req.params;
    const result = await contactsService.updateContactById(id, req.body);
    if(!result){
        throw HttpError (404, `Contact with id=${contactId} not found`);
    }

    res.json(result);

 } catch (error) {
    next(error);
 }
}

const deleteById = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const result = await contactsService.removeContact(id);
        if(!result){
            throw HttpError (404, `Contact with id=${contactId} not found`);
        }
        res.json({
            message: "contact deleted"
        })
    } catch (error) {
        next(error);
    }
}

export default {
    getAllContacts,
    getByID,
    add,
    updateById,
    deleteById,
}