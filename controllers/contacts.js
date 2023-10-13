import Contact from "../models/contact.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({owner}, "-createdAt -updateAt", {skip, limit}).populate("owner", "name");  
    res.status(200).json(result);
};

const getById = async (req, res) => { 
    const { contactId } = req.params;
    const { _id: owner } = req.user;   
    
    const result = await Contact.findOne({ _id: contactId, owner });
    // const result = await Contact.findById(contactId);
    
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(result); 
}

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

    const result = await Contact.findOneAndDelete({ _id: contactId});
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json({ message: "contact deleted" });
    }


const add = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.create ({...req.body, owner});
  res.status(201).json(result);
}

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  
  const result = await Contact.findOneAndUpdate({_id: contactId, owner }, req.body, {
    new: true,
  });        
      if (!result) {
          throw HttpError(404, `Not found`);
      }
      res.status(200).json(result); 
}

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndUpdate({_id: contactId, owner}, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const updateStatusContactById = async (req, res, next) => {

  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndUpdate({ _id: contactId, owner });

    if (req.body.favorite === undefined) {
        res.status(400).json({
            message: 'missing field favorite'
        });
        return;
    }
    next();
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),    
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
    updateStatusContact: [updateStatusContactById, ctrlWrapper(updateStatusContact)] 
}
