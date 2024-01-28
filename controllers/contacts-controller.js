import Contact, { contactAddSchema, contactUpdateSchema, contactUpdateFavoriteSchema } from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
 

const getAll = async (req, res, next) => {
    try {
        const { _id: owner } = req.user._id;
        const { page=1, limit=20} = req.query;
        const skip = (page - 1) * limit;
        const result = await Contact.find({ owner }, "-createdAt, -updatedAt", { skip, limit}).populate("owner", "email");
      
        res.json(result); 
    }
    catch (error) {
        next(error);
    }
   
}

const getById = async (req, res, next) => {
    try {
        const { contactId:_id } = req.params;
        const { _id: owner } = req.user._id;
        const result = await Contact.findOne({_id, owner});
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
        const { _id: owner } = req.user._id;

        const result = await Contact.create({ ...req.body, owner });
        
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
        const { contactId:_id } = req.params;
        const { _id: owner } = req.user._id;
        const result = await Contact.findOneAndUpdate({_id, owner}, req.body);
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
         const { contactId:_id } = req.params;
        const { _id: owner } = req.user._id;
        const result = await Contact.findOneAndUpdate({_id, owner}, req.body);
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
        const { contactId:_id } = req.params;
        const { _id: owner } = req.user._id;
        const result = await Contact.findOneAndDelete({_id, owner});
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