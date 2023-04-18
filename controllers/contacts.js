const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers");

const { controllerWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 10, favorite, name, phone } = req.query;
  const skip = (page - 1) * limit;
  const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
  const filter = {
    owner,
    ...(favorite && { favorite }),
    ...(name && { name: new RegExp(name, "i") }),
    ...(phone && { phone: phoneRegex.test(phone) ? phone : null }),
  };
  const contacts = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json({
    contacts,
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { id: owner } = req.user;
  const contact = await Contact.findOne({ _id: contactId, owner });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    contact,
  });
};

const add = async (req, res) => {
  const { id: owner } = req.user;

  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json({
    newContact,
  });
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const { id: owner } = req.user;
  const remoteContact = await Contact.findOneAndRemove({
    _id: contactId,
    owner,
  });
  if (!remoteContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
    remoteContact,
  });
};

const putById = async (req, res) => {
  const { contactId } = req.params;
  const { id: owner } = req.user;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    updatedContact,
  });
};

const favoriteUpdate = async (req, res) => {
  const { contactId } = req.params;
  const { id: owner } = req.user;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    updatedContact,
  });
};

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  deleteById: controllerWrapper(deleteById),
  putById: controllerWrapper(putById),
  favoriteUpdate: controllerWrapper(favoriteUpdate),
};
