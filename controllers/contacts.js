const Contact = require("../models/contact")
const { HttpError } = require("../helpers/HttpError");
const { ctrlWrapper } = require("../helpers");


const getAllContactsList = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, "-createAt -updateAt", {skip: skip, limit: limit})
    res.status(200).json(result);
}

const getContactsById = async (req, res) => {
  
    const { id } = req.params;
    const {_id: owner} = req.user;
   
    const result = await Contact.findById({_id:id, owner});
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    return res.status(200).json(result);
 
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  
  const result = await Contact.create({ ...req.body, owner });
  console.log(result)
    res.status(201).json(result);
 
};

const deleteContact = async (req, res) => {

  const { id } = req.params;
  const {_id:owner} = req.user;

  
    const result = await Contact.findByIdAndRemove({_id:id, owner});
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.status(200).json({ message: "Contact deleted" });
  
};

const updateContact = async (req, res) => {
  
  
  const { id } = req.params;
  const { _id: owner } = req.user;
  
      const result = await Contact.findByIdAndUpdate({_id:id,owner}, req.body, {new: true});
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