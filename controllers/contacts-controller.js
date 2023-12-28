import Contact, { contactAddSchema, contactUpdateSchema, contactUpdateFavoriteSchema } from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
 

const getAll = async (req, res, next) => {
    try {
       const result = await Contact.find({}, "-createdAt, -updatedAt");
       res.json(result); 
    }
    catch (error) {
        next(error);
    }
   
}

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findById(contactId);
        if (!result) {
            throw HttpError(404, `Movie with id=${contactId} not found`);
            }
    
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

const add = async (req, res, next) => {
    try {
        const {error} = contactAddSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        
        const result = await Contact.create(req.body);
        
        res.status(201).json(result);   
    }
    catch (error) {
        next(error);
    }
  
}

const updateById = async (req, res, next) => {
    try {
        const { error } = contactUpdateSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body);
        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

const updateStatusContact = async (req, res, next) => {
    try {
        const { error } = contactUpdateFavoriteSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message );
        }
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body);
        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

const deleteById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndDelete(contactId);
        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json({
            message: "contact deleted"
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
    updateStatusContact,
    deleteById
}