const {contactModel} = require("../models");
const { HttpError, controllerWrapper } = require("../helpers");

const {Contact} = contactModel;


const getContacts = async (request, response, next) => {
  const { _id: owner } = request.user;
  const { page = 1, limit = 10, favorite } = request.query;
  const skip = (page - 1) * limit;
  const query = { owner };
  if (favorite !== undefined) {
    query.favorite = favorite;
  }

  const result = await Contact.find(query, "-createdAt -updatedAt", { skip, limit })
    .populate("owner", "email");
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json(result);
};

const getContact = async (request, response, next) => {
  const { contactId } = request.params;
  const result = await Contact.finfById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json(result);
};

const addContact = async (request, response, next) => {
  const { _id: owner } = request.user;
  const result = await Contact.create({...request.body, owner});
  response.status(201).json(result);
};

const deleteContact = async (request, response, next) => {
  const { contactId } = request.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json({ message: "contact deleted" });
};

const updateContact = async (request, response, next) => {
  const { contactId } = request.params;
  const result = await Contact.findByIdAndUpdate(contactId, request.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json(result);
};

const updateStatusContact = async (request, response, next) => {
  const { contactId } = request.params;
  const result = await Contact.findByIdAndUpdate(contactId, request.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json(result);
};

module.exports = {
  getContacts: controllerWrapper(getContacts),
  getContact: controllerWrapper(getContact),
  addContact: controllerWrapper(addContact),
  deleteContact: controllerWrapper(deleteContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
