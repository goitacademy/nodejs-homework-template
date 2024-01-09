import * as contactsService from "../models/contacts.js";

import { HttpError } from "../helpers/index.js";
import { contactsAddSchema, contactsUpdateSchema } from "../schemas/contacts-chemas.js";

const getAll = async (req, res, next) => {
    try {
        const result = await contactsService.listContacts();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) =>{
    try{
        const {id} =  req.params;
        const result = await contactsService.getContactById(id);
        if(!result){
            throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    } 
}

const add = async (req, res, next) =>{
    try{
        const {error} = contactsAddSchema.validate(req.body)
        if(error){
            throw HttpError(400, error.message);
        }
        const result = await contactsService.addContact(req.body);
        res.status(201).json(result)
    }
    catch (error) {
        next(error);
    } 
}

const updateById = async (req, res, next) =>{
    try{
        const {error} = contactsUpdateSchema.validate(req.body)
        if(error){
            throw HttpError(400, error.message);
        }
        const { id } = req.params;
        const result = await contactsService.updateContactById(id, req.body);
        res.json(result)
    }
    catch (error) {
        next(error);
    } 
}

const deleteById = async (req, res, next) =>{
    try{
        const { id } = req.params;
        const result = await contactsService.removeContact(id);
        if(!result){
            throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json({
            message: "Delete success"
        })
    }
    catch (error) {
        next(error);
    } 
}

export default {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
}