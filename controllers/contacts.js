const { Contact } = require("../models");

const listContacts = async (req, res) => {
  const result = await Contact.find({});
  res.json({
    data: {
      result,
    },
  });
};

const getContactById = async (req, res) => {
  const { contactId } = await req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    res.status(404).json({
      message: "Not found",
    });
  }
  res.json({
    data: {
      result,
    },
  });
};

const removeContact = async (req, res) => {
  const { contactId } = await req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    res.status(404).json({
      message: "Not found",
    });
  }
  res.json({
    message: "Contact deleted",
  });
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    data: {
      result,
    },
  });
};

const updateContact = async (req, res) => {
  const { contactId } = await req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    res.status(404).json({
      message: "Not found",
    });
  }
  res.json({
    data: {
      result,
    },
  });
};

const updateFavorite = async (req, res) => {
  const { contactId } = await req.params;
  const { favorite } = await req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!result) {
    res.status(404).json({
      message: "Not found",
    });
  }
  res.json({
    data: {
      result,
    },
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
};
