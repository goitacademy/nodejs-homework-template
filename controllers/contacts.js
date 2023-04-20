const { Contact } = require('../models/contacts');
const { asyncMiddleware } = require('../middlewars');

const { httpError } = require('../helpers');

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner };
  if (favorite !== undefined) {
    query.favorite = favorite;
  }
  const contacts = await Contact.find(query, undefined, { skip, limit })
    .populate('owner', 'email subscription');
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const {
    user: { _id: owner },
    params: { contactId },
  } = req;
  const contact = await Contact.findOne({ _id: contactId, owner });

  if (!contact) {
    throw httpError(404, 'Not found')
  }
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const remove = async (req, res) => {
  const {
    user: { _id: owner },
    params: { contactId },
  } = req;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });

  if (!result) {
    throw httpError(404, 'Not found')
  }
  res.status(200).json({ message: 'contact deleted' });
};

const update = async (req, res) => {
  const {
    user: { _id: owner },
    params: { contactId },
  } = req;
  
  if (!Object.keys(req.body).length)
    return res.status(400).json({ message: "missing fields" });
  
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    req.body,
    { new: true }
  );

  if (!updatedContact) {
    throw httpError(404, 'Not found')
  }
  res.status(200).json(updatedContact);
};

const updateStatus = update;

module.exports = {
  listContacts: asyncMiddleware(getAllContacts),
  getContactById: asyncMiddleware(getById),
  addContact: asyncMiddleware(add),
  deleteContact: asyncMiddleware(remove),
  updateContact: asyncMiddleware(update),
  updateStatus: asyncMiddleware(updateStatus),
};