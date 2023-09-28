const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

const { Contact } = require("../models/contact");

const getAll = async (_, res) => {
  const result = await Contact.find();
  res.json({ status: "success", code: 200, data: { contacts: result } });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId });
  console.log(result);
  if (!result) {
    throw HttpError(404, {
      status: "error",
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: "Not Found",
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      contact: result,
    },
  });
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contact: result,
    },
  });
};

const removeById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove({ _id: contactId });

  if (!result) {
    throw HttpError(404, {
      status: "error",
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: "Not Found",
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      message: "Contact deleted",
      contact: result,
    },
  });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, {
      status: "error",
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: "Not Found",
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      contact: result,
    },
  });
};

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, {
      status: "error",
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: "Not Found",
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      contact: result,
    },
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
};
