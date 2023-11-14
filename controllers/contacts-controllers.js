import contactService from "../models/index.js";

 import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

import { contactAddSchema, contactUpdateSchema } from "../schemas/validationSchema.js";

const getAll = async (req, res, next) => {
        const result = await contactService.listContacts();
        res.json(result);
  
}

const getById = async (req, res, next) => {
    
        const { contactId } = req.params;
        const result = await contactService.getContactById(contactId);
        if (!result) {
             throw HttpError(404, `Contact with id=${contactId} not found`);
        }
        res.json(result);
}

const add = async(req, res, next)=> {
        const result = await contactService.addContact(req.body);
        res.status(201).json(result);
    }
    


const updateById = async(req, res, next)=> {
        const {contactId} = req.params;
        const result = await contactService.updateContact(contactId, req.body);
        if (!result) {
            throw HttpError(404, `Contact with id=${contactId} not found`);
        }

        res.json(result);

}

const deleteById = async(req, res, next)=> {
        const {contactId} = req.params;
        const result = await contactService.removeContact(contactId);
        if (!result) {
            throw HttpError(404, `Contact with id=${contactId} not found`);
        }
        res.json({
            message: "contact deleted"
        })
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}