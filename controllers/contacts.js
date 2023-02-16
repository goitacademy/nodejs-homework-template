const { Contact } = require("../../../models/contacts");
const ReqError = require("../help/ReqError");

const getAllContacts = async (request, response, next) => {
  const contact = await Contact.find();
  response.status(200).json(contact);
};

const getContactById = async (request, response, next) => {
  const { id } = request.user;
  const contact = await Contact.findOne({
    owner: id,
    _id: request.params.contactId,
  });
  if (!contact) {
    throw ReqError(404, "Not found");
  }
  response.status(200).json(contact);
};

const createContact = async (request, response, next) => {
    const { id } = request.user;
  const contact = await Contact.create({...request.body, owner: id});
  if (!contact) {
    throw ReqError(404, "Not found");
  }
  response.status(201).json(contact);
};

const updateContact = async (request, response, next) => {
  const { contactId } = request.params;
  const contact = await Contact.findByIdAndUpdate(contactId, request.body, {
    new: true,
  });

  if (!contact) {
    throw ReqError(404, "Not found");
  }
  response.status(201).json(contact);
};

const updateContacStatus = async (request, response, next) => {
  const { contactId } = request.params;
  const { id } = request.user;

  const contact = await Contact.findOneAndUpdate(
    { owner: id, _id: contactId },
    request.body,
    { new: true }
  );

  if (!contact) {
    throw ReqError(404, "Not found");
  }
  response.status(201).json(contact);
};

const deleteContact = async (request, response, next) => {
  const { contactId } = request.params;
  const { id } = request.user;
  const contact = await Contact.findOneAndRemove({ owner: id, _id: contactId });
  if (!contact) {
    throw ReqError(404, "Not found");
  }
  response.status(201).json({ message: "successfuly deleted" });
};

const updateContactStat = async (request, response, next) => {
    const { contactId } = request.params;
    const { id } = request.user;
  
    const contact = await Contact.findOneAndUpdate(
      { owner: id, _id: contactId },
      request.body,
      { new: true }
    );
    if (!contact) {
      throw ReqError(404, "Not found");
    }
  
    response.status(200).json(contact);
  };

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateContacStatus,
  deleteContact,
  updateContactStat,
};
