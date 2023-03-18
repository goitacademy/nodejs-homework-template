const {
  contacts: { Contact },
} = require("../models");
const helper = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts: result,
    },
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  res.json({
    status: "success",
    code: 200,
    data: {
      contact: result,
    },
  });
};

const create = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contact: result,
    },
  });
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw helper.HttpError(404, "Not found");
  } else {
    res.json({ message: "contact deleted" });
  }
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  res.json({
    status: "success",
    code: 200,
    data: {
      contact: result,
    },
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  res.json({
    status: "success",
    code: 200,
    data: {
      contact: result,
    },
  });
};

module.exports = {
  getAll: helper.ctrlWrapper(getAll),
  getById: helper.ctrlWrapper(getById),
  create: helper.ctrlWrapper(create),
  remove: helper.ctrlWrapper(remove),
  update: helper.ctrlWrapper(update),
  updateStatusContact: helper.ctrlWrapper(updateStatusContact),
};
