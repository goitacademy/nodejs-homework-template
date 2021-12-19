const Contact = require("../model/contact");
const { NotFound } = require("http-errors");

const getAll = async (req, res) => {
  const contacts = await Contact.find({});
  res.status(201).json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const contact = await Contact.findById(id);

  if (!contact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }

  res.json({
    status: "success",
    code: 201,
    data: {
      contact,
    },
  });
};

const add = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: { result },
  });
};

const updateContactStatus = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  removeById,
  updateContactStatus,
};
