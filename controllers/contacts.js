const { Contact } = require("../models/contact");

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  let findParam = null;
  if (favorite === true || !favorite === false) {
    findParam = { $and: [{ owner: _id }, { favorite }] };
  } else {
    findParam = { owner: _id };
  }
  const contacts = await Contact.find(findParam, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  return res.json({ status: "success", code: 200, data: { contacts } });
};

const getContactById = async (req, res) => {
  const contact = await Contact.findOne({
    _id: req.params.contactId,
    owner: req.user._id,
  }).populate("owner", "_id name email");
  if (contact) {
    return res.json({ status: "success", code: 200, data: { contact } });
  } else {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }
};

const addContact = async (req, res) => {
  const contact = await Contact.create({ ...req.body, owner: req.user._id });
  return res
    .status(201)
    .json({ status: "success", code: 201, data: { contact } });
};

const updateContact = async (req, res) => {
  const contact = await Contact.findOneAndUpdate(
    {
      _id: req.params.contactId,
      owner: req.user._id,
    },
    req.body,
    { new: true }
  ).populate("owner", "_id name email");
  if (contact) {
    return res.json({ status: "success", code: 200, data: { contact } });
  } else {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }
};

const deleteContact = async (req, res) => {
  const contact = await Contact.findOneAndRemove({
    _id: req.params.contactId,
    owner: req.user._id,
  });
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      message: "Contact deleted",
    });
  } else {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }
};

const updateContactFavorite = async (req, res) => {
  const { favorite } = req.body;
  const contact = await Contact.findOneAndUpdate(
    {
      _id: req.params.contactId,
      owner: req.user._id,
    },
    { favorite },
    { new: true }
  ).populate("owner", "_id name email");
  if (contact) {
    return res.json({ status: "success", code: 200, data: { contact } });
  } else {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  updateContactFavorite,
};
