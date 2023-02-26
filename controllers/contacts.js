const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../helpers/ctrlWrapper.js");

// ======= Get All Contqcts ========================
const { Contact } = require("../models/contact");

async function getAllContacts(req, res) {
  const result = await Contact.find();
  res.json(result);
}

// =======Get Contacts by Id =====================

async function getContactById(req, res) {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId });
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
}

// ========= Add  Contact =======================

async function addContact(req, res) {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
}

// ========= Delete contact ======================

async function removeContact (req, res)  {

    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "Contact was deleted successfully" });
};

// ======== Update Whole  Contact ========================
async function updateContact (req, res) {
    const { name, email, phone } = req.body;
     
    const { contactId } = req.params;

    if (!name && !email && !phone) {
      res.status(400).json({ message: '"message": "missing fields"' });
    }

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
};

// ======== Update Status of a  Contact as Favorite ========================

async function updateFavorite(req, res) {
  const { favorite } = req.body;

  const { contactId } = req.params;

  if (!favorite  ) {
    res.status(400).json({ message: '"message": "missing fields"' });
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};


module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
