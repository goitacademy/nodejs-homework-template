const Contact = require("../schemas/mongooseSchemas/contactSchema");
const { handleError, funcHandler } = require("../utils");

const readContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner, ...(favorite ? { favorite: true } : {}) };
  const contactList = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");

  const newResult =
    contactList.length === 0
      ? {
          result: [],
          page: 0,
          limit: 0,
        }
      : { result: contactList, page, limit };

  res.json(newResult);
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const contactById = await Contact.findById(contactId);

  if (contactById === null) {
    throw handleError(404, "Not Found");
  }

  res.json(contactById).status(200);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findOneAndDelete(contactId);
  if (deletedContact === null) {
    throw handleError(404, "Not Found");
  }

  res.json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const newContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!newContact) {
    throw handleError(404, "Not Found");
  }
  res.json(newContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const newContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!newContact) {
    throw handleError(404, "Not Found");
  }
  res.json(newContact);
};

module.exports = {
  readContacts: funcHandler(readContacts),
  getById: funcHandler(getById),
  removeContact: funcHandler(removeContact),
  addContact: funcHandler(addContact),
  updateContact: funcHandler(updateContact),
  updateStatusContact: funcHandler(updateStatusContact),
};
