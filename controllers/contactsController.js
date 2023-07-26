import HttpError from "../helpers/HttpError.js";
// import contactsService from '../models/contacts.js';
import Contact from "../models/contacts.js";

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  }
  catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
     throw HttpError(404, "Not found")
    }
    res.json(result)
  }
  catch (error) {
    next(error);
  }
}

const add = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  }
  catch (error) {
    next(error);
  }
}

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: 'contact deleted' })
  }
  catch (error) {
    next(error);
  }
}

const updateById = async (req, res, next) => {
  try {
   const { contactId } = req.params;
   const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result);
  }
  catch (error) {
    next(error)
  }
}

const updateStatusContact = async (req, res, next) => {
  try {
   const { contactId } = req.params;
   const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result);
  }
  catch (error) {
    next(error)
  }
}

export default  {
    getAll,
    getById,
    add,
    deleteById,
    updateById,
    updateStatusContact
}