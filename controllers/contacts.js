import Contact from "../models/contact.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
    const result = await Contact.find();
    res.status(200).json(result);
};

const getById = async (req, res) => { 
    const { contactId } = req.params;
    // const result = await Contact.findOne({ _id: contactId });
    const result = await Contact.findById(contactId);
    
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(result); 
}

const deleteById = async (req, res) => {
    const { contactId  } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json({ message: "contact deleted" });
    }


const add = async (req, res) => {
  const result = await Contact.create (req.body);
  res.status(201).json(result);
}

const updateById = async (req, res) => {
  const {contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });        
      if (!result) {
          throw HttpError(404, `Not found`);
      }
      res.status(200).json(result); 
}


const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const updateStatusContactById = async (req, res, next) => {
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
