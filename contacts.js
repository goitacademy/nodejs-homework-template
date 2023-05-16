const Contact = require('./models/contact');
const controllerWrapper = require('./helpers/controllerWrapper')

const {
  contactsAddJoiSchema,
  contactsJoiUpdateSchema,
  contactJoiFavoriteSchema,
  HttpError,
  contactsQuery,
} = require("./helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  let { page = 1, limit = 20 } = req.query;
  limit = limit > 20 ? 20 : limit;
  const skip = (page - 1) * limit;

  const query = contactsQuery(owner, req.query);
  const contacts = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOne({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({ status: "success", code: 200, data: { result } });
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { error } = contactsAddJoiSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const { error } = contactsJoiUpdateSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing field favorite");
  }
  const { error } = contactJoiFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
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
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  deleteById: controllerWrapper(deleteById),
  updateById: controllerWrapper(updateById),
  updateFavoriteById: controllerWrapper(updateFavoriteById),
};
