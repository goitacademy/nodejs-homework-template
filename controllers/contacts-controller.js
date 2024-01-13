const { HttpError } = require("../helpers/index.js");
const { ctrlWrapper } = require("../utils/");
const Contacts = require('../models/contacts.js')

const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contacts.find({owner}, '', {skip, limit}).populate("owner", "-_id email subscription");
  // console.log(contacts)
  res.json(contacts); 
}; 

const getContactById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const contact = await Contacts.findOne({_id: contactId, owner});

  if (!contact) throw HttpError(404, `Contact with id ${contactId} not found.`);

  res.status(200).json(contact);
};

const postContact = async (req, res) => {
  const { _id: owner } = req.user;
  
  const contact = await Contacts.create({...req.body, owner});

  res.status(201).json(contact);
};

const deleteContactByid = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const contact = await Contacts.findOneAndDelete({_id: contactId, owner});
  
  if (!contact) throw HttpError(404, `contact with id ${contactId} not found`);
  
  res.json({
    message: "Contact deleted",
  });
};

const putContactById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contacts.findOneAndUpdate({_id: contactId, owner}, req.body, {new: true})
  
  // if (!contact) {
  if (result.modifiedCount == 0) {
    throw HttpError(404, `Contact with id ${contactId} not found.`);
  }

  const contact = await Contacts.findById(contactId);

  res.json(contact);
};

const updateStatusContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const response = await Contacts.updateOne({_id: contactId, owner}, req.body, {new: true})
  // console.log('PATCH ', contact);
  // if (!contact) {
  if (response.modifiedCount == 0) {
    throw HttpError(404, `Contact with id ${contactId} not found.`);
  }
  
  const contact = await Contacts.findById(contactId);

  res.json(contact);
}

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getContactById: ctrlWrapper(getContactById),
  postContact: ctrlWrapper(postContact),
  deleteContactByid: ctrlWrapper(deleteContactByid),
  putContactById: ctrlWrapper(putContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact)
};
