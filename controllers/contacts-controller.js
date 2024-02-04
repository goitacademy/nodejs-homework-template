import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { HttpError } from "../helpers/HttpError.js";
import { Contact } from "../models/contacts.js";


const getAll = async (req, res) => {
   const { _id: owner } = req.user;
   const { page = 1, limit = 20 } = req.query;
     const skip = (page - 1) * limit;
   const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip,limit}).populate("owner", "email subscription")
    
        res.json(result);
 
};


const getById = async (req, res, next) => {
    const { contactId : _id } = req.params;
   const { _id: owner } = req.user;
   const result = await Contact.findOne({_id, owner})
        if (!result) {
           throw HttpError(404,"Not found")
        }
        res.json(result);
};

const deleteById = async (req, res, next) => {
     const { contactId : _id } = req.params;
   const { _id: owner } = req.user;
        const result = await Contact.findOneAndDelete({_id,owner});
        if (!result) {
           throw HttpError(404, "Not found")
        }
        res.json({
            message: 'contact deleted'
        })
};


const add = async (req, res) => {
   const { _id: owner } = req.user;
  const result = await Contact.create({...req.body, owner});

   res.status(201).json(result);
};

const updateById = async (req, res, next) => {
     const { contactId : _id } = req.params;
   const { _id: owner } = req.user;
    const result = await Contact.findOneAndUpdate({_id,owner}, req.body, {new:true});

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