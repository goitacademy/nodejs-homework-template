import createHttpError from "http-errors";
import * as ContactService from "../services/contacts.js";
import { updateContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

async function getContacts(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await ContactService.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
  res.send({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
}

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await ContactService.getContactById(contactId, req.user._id);

  if (contact === null) {
    return next(createHttpError(404, "Contact not found"));
  }

  res.send({
    status: 200,
    message: `Successfully found contact with id **${contactId}**!`,
    data: contact,
  });
}

async function createContact(req, res) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user._id,
  };
  const createdContact = await ContactService.createContact(contact);

  res.status(201).send({
    status: 201,
    message: `Successfully created a contact!`,
    data: createdContact,
  });
}

async function patchContact(req, res, next) {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body, req.user._id);

  if (!result) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;

  const result = await ContactService.deleteContact(contactId);

  if (!result) {
    return next(createHttpError(404, "Contact not found"));
  }

  res.status(204).send();
}
export {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
};
