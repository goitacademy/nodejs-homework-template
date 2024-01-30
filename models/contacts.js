const { Contact } = require("../models/schems/schems");
const { httpError, ctrlWrapper } = require("../helpers/index");
// зламано
const listContacts = async (req, res) => {
      const data = await Contact.find({});
      return res.status(201).json(data);
};

// отримує контакт по ід; прац
const getContactById = async (req, res) => {
  const result = await Contact.findById(req.params.contactId);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};
const removeContact = async (req, res) => {
  const idx = await Contact.findByIdAndDelete(req.params.contactId);
  if (!idx) {
    res.status(404).json({
      code: 404,
      message: `ID ${req.params.contactId} not found`,
    });
  }

  res.status(201).json('removedContact');
};

const addContact = async (req, res) => {
  const data = await Contact.create({ ...req.body });
  res.status(201).json(data);
};

const updateContact = async (req, res) => {
  const data = await Contact.findByIdAndUpdate(
    req.params.contactId,
    { ...req.body },
    {
      runValidators: true,
      new: true,
    }
  );

  if (!data) {
    res.status(404).json({
      code: 404,
      message: `ID ${req.params.contactId} not found`,
    });
  }
  res.status(200).json(data);
};

const updateFavoriteToContact = async (req, res, next) => {
  const {contactId } = req.params;

  const info = req.body;
  try {
    if (!Object.keys(info).includes("favorite")) {
      res.status(400).json({ message: "Missing field favorite." });
    }
    const result = await Contact.findByIdAndUpdate(contactId, info);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavoriteToContact: ctrlWrapper(updateFavoriteToContact),
};