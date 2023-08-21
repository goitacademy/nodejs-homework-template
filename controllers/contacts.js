const Contact = require("../models/contact")
const { HttpError } = require("../helpers/HttpError");
const { ctrlWrapper } = require("../helpers");


const getAllContactsList = async (req, res, next) => {
 
    const result = await Contact.find()
    res.status(200).json(result);
}

const getContactsById = async (req, res) => {
  
    const { id } = req.params;
   
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    return res.status(200).json(result);
 
};

const addContact = async (req, res) => {
 
    const result = await Contact.create(req.body);
    res.status(201).json(result);
 
};

const deleteContact = async (req, res) => {

    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.status(200).json({ message: "Contact deleted" });
  
};

const updateContact = async (req, res) => {
  
  
  const { id } = req.params;
  
      const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
      if (!result) {
        throw HttpError(404, "Contact not found");
  }
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
    res.status(200).json(result)

 
};

const favoriteContact = async (req, res) => {
  
  
  const { id } = req.params;
  
      const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
      if (!result) {
        throw HttpError(404, "Contact not found");
  }
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
    res.status(200).json(result)

 
};

module.exports = {
    getAllContactsList: ctrlWrapper(getAllContactsList),
    getContactsById: ctrlWrapper(getContactsById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
    favoriteContact: ctrlWrapper(favoriteContact),

}