import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contacts.js";

const getAll = async (req, res, next) => {
  try { 
    const [key] = Object.keys(req.query);
    const [value] = Object.values(req.query);
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit; 
    const result = await Contact.find({ owner }, {}, { skip, limit });
   
    if (req.query && key==="favorite") {
      if (value === "true") {     
        const resultFiltered = result.filter((contact) => contact.favorite === true);
        res.json(resultFiltered);
        return;
      }
      if (value === "false") {
        const resultFiltered = result.filter((contact) => contact.favorite === false);
        res.json(resultFiltered);
        return;
      }
    }
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
  const { _id: owner } = req.user;
  
  try {
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
  }
  catch (error) {
    next(error);
  }
}

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId)
    const result = await Contact.findByIdAndRemove(contactId);
    console.log(result)
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
    updateStatusContact,
}