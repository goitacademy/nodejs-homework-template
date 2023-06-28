const Contact = require("../models/contact");

const { HttpError } = require("../helpers");

const {ctrlWrapper} = require('../decorators');

const getAllContacts = async (req, res) => {
    const result = await Contact.find(); 
    res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(result);
};

const postContact = async (req, res) => {

    // const { error } = contactAddSchema.validate(req.body);
    // if (error) {
    //   throw HttpError(400, error.message);
    // }
  const result = await Contact.create(req.body);
  
  res.status(201).json(result);

};

const deleteContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(result);
};

const putContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
}

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  postContact: ctrlWrapper(postContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  putContactById: ctrlWrapper(putContactById),
  updateFavorite: ctrlWrapper(updateFavorite),
};