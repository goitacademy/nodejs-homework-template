const ContactLeaveSchema = require("../models/contact");
const { contactComesSchema, updateFavoriteSchema } = require("../schemas");
const { controllerWrapper, HttpError } = require("../utils");

const listContacts = async (request, response) => {
  const contacts = await ContactLeaveSchema.find({}, "-createdAt -updatedAt");
  response.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getContactById = async (request, response) => {
  const { id } = request.params;
  const contact = await ContactLeaveSchema.findById(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  response.json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
};

const addContact = async (request, response) => {
  const { error } = contactComesSchema.validate(request.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
  const result = await ContactLeaveSchema.create(request.body);
  response.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

const removeContact = async (request, response) => {
  const { id } = request.params;
  const result = await ContactLeaveSchema.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

const updateContact = async (request, response) => {
  const { error } = contactComesSchema.validate(request.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const { id } = request.params;
  const result = await ContactLeaveSchema.findByIdAndUpdate(id, request.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const updateStatusContact = async (request, response) => {
  const { error } = updateFavoriteSchema.validate(request.body);
  if (error) {
    throw HttpError(400, "missing field favorite");
  }
  const { id } = request.params;
  const result = await ContactLeaveSchema.findByIdAndUpdate(id, request.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  removeContact: controllerWrapper(removeContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
