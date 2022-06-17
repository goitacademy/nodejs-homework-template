const { Contact, favoriteJoiShema, joiShema } = require("../../models/contact");

const listContacts = async (req, res, next) => {
  // const { _id } = req.user;
  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email");
  return res.json({ contacts });
};

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async (req, res, next) => {
  const { _id } = req.user;
  const validation = joiShema(req.body);
  if (!validation.error) {
    const newContact = await Contact.create({ ...req.body, owner: _id });
    return res.status(200).json({ status: "success", newContact });
  }
  return res.status(400).json({ message: "missing required name field" });
};

const updateContact = async (contactId, body) => {
  const validation = joiShema(body);
  if (!validation.error) {
    const upContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return upContact;
  }
  return null;
};

const updateStatusContact = async (contactId, body) => {
  const validation = favoriteJoiShema(body);
  if (!validation.error) {
    const upContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return upContact;
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
