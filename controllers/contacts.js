const { Contact } = require("../models/contact")

const { HttpError } = require("../helpers")

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
      
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const add = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const deleteById = async (req, res, next) => {
  try {
   const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove (contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};
const updateById = async (req, res, next) => {
  try {
    if (JSON.stringify(req.body) === "{}") {
      throw HttpError(400, "Missing fields");
    }
   const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body,{new:true});
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
 
    // if (!Object.keys(req.body).includes('favorite')) {
    //   throw HttpError(400, "missing field favorite");
   
    // }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body,{new:true});
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
 updateStatusContact,
};
