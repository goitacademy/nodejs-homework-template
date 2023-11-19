import {
  Contact,
  contactValidate,
  favoriteValidate,
} from "../models/contact.js";
import "colors";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { HttpError } from "../helpers/HttpError.js";

// ============= Get a full list of contacts ================ //
async function listContacts(req, res) {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  let query = { owner };

  if (favorite === "true") {
    query.favorite = true;
  }

  const data = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");

  res.json(data);
}

export const getAll = ctrlWrapper(listContacts);

// ================ Get a contact by ID ================ //
async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const { _id } = req.user;

  const contact = await Contact.findById(contactId);

  const verifiedContact =
    contact.owner.toString() === _id.toString()
      ? contact
      : next(HttpError(404, "Contact not found"));

  res.json(verifiedContact);
}

export const getById = ctrlWrapper(getContactById);

// ============= Add a new contact ================== //
async function addContact(req, res) {
  const { _id: owner } = req.user;
  const { error } = contactValidate(req.body);

  if (typeof error !== "undefined") {
    const errorMessages = error.details
      .map((err) => `${err.message}`)
      .join(", ");
    return res.status(400).json({ message: errorMessages });
  }

  const contact = await Contact.create({ ...req.body, owner });
  const { _id, name, email, phone, favorite } = contact;

  if (!contact) res.status(400).json({ message: "missing required fields" });
  res.status(201).json({ _id, name, email, phone, favorite });
}

export const add = ctrlWrapper(addContact);

// =============== Update an existing contact ====================== //
async function updateContact(req, res, next) {
  const { contactId } = req.params;

  const { error } = contactValidate(req.body);

  if (typeof error !== "undefined") {
    const errorMessages = error.details.map(
      (err) => `missing field: ${err.message}`
    );
    return res.status(400).json({ messages: errorMessages });
  }

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) return next();

  res.status(200).json(contact);
}

export const updateById = ctrlWrapper(updateContact);

// ============== Update any contact Status by ID ============== //
async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;

  const { error } = favoriteValidate(req.body);

  if (typeof error !== "undefined") {
    return res.status(400).json({ messages: "missing field favorite" });
  }

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) return next();

  res.status(200).json(contact);
}

export const updateFavorite = ctrlWrapper(updateStatusContact);

// ============== Delete a contact by ID ==================== //
async function removeContact(req, res, next) {
  const { contactId } = req.params;

  await Contact.findByIdAndDelete(contactId);

  res.status(200).json({ message: "contact deleted" });
}

export const removeContactById = ctrlWrapper(removeContact);
