const { Contact } = require("../models/contact");

const allContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const contactById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required name field",
    });
    return;
  }

  const newContact = await Contact.create(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  await Contact.findByIdAndRemove(id);
  res.json({
    status: "success",
    code: 200,
  });
  if (!id) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
};

const updateContact = async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields",
    });
    return;
  }

  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  if (!req.body) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing field favorite",
    });
    return;
  }

  const contact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = {
  allContacts,
  contactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
