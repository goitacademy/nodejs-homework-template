const contacts = require("../models");
const { HttpError, controllerWrapper } = require("../helpers");

const getContacts = async (request, response, next) => {
    const result = await contacts.find({}, "-createdAt -updatedAt");
    if (!result) {
        throw HttpError(404, "Not found");
    }
    response.json(result);
};

const getContact = async (request, response, next) => {
  const { contactId } = request.params;
  const result = await contacts.finfById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json(result);
};

const addContact = async (request, response, next) => {
  const result = await contacts.create(request.body);
  response.status(201).json(result);
};

const deleteContact = async (request, response, next) => {
  const { contactId } = request.params;
  const result = await contacts.findByIdAndDelete(contactId);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    response.json({ message: "contact deleted" });
};

const updateContact = async (request, response, next) => {
  const { contactId } = request.params;
  const result = await contacts.findByIdAndUpdate(contactId, request.body, {new:true,
});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json(result);
};

const updateStatusContact = async (request, response, next) =>{
    const {contactId} = request.params;
    const result = await contacts.findByIdAndUpdate(contactId, request.body, {new:true,
    })
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
  updateStatusContact: controllerWrapper(updateStatusContact)
};