
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { HttpError } from "../helpers/HttpError.js";
import { Contact } from "../models/Contacts.js";


const getAll = async (req, res) => {
   const result = await Contact.find({}, "-createdAt -updatedAt")
    
        res.json(result);
 
};


const getById = async (req, res, next) => {
    const { contactId } = req.params;
        const result = await Contact.findById(contactId)
        if (!result) {
           throw HttpError(404,"Not found")
        }
        res.json(result);
};

const deleteById = async (req, res, next) => {
     const { contactId } = req.params;
        const result = await Contact.findByIdAndDelete(contactId);
        if (!result) {
           throw HttpError(404, "Not found")
        }
        res.json({
            message: 'contact deleted'
        })
};


const add = async (req, res) => {
  const result = await Contact.create(req.body);

   res.status(201).json(result);
};

const updateById = async (req, res, next) => {
     const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
};


export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    deleteById: ctrlWrapper(deleteById),
    add: ctrlWrapper(add),
  updateById:ctrlWrapper(updateById)
}