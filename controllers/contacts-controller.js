import { Contact } from "../models/contact.js";
import "colors";
import { ctrlWrapper } from "../decorators/ctrlWrapper.js";
import { HttpError } from "../helpers/HttpError.js";

// ============= Get full list of contacts ================ //
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

// ================ Get contact by ID ================ //
async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const { _id } = req.user;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    return next(HttpError(404, "Contact not found"));
  }

  const verifiedContact =
    contact.owner.toString() === _id.toString()
      ? contact
      : next(HttpError(404, "Contact not found"));

  res.json(verifiedContact);
}

// ============= Add new contact ================== //
async function addContact(req, res) {
  const { _id: owner } = req.user;

  const contact = await Contact.create({ ...req.body, owner });

  const { _id, name, email, phone, favorite } = contact;

  if (!contact) res.status(400).json({ message: "missing required fields" });

  res.status(201).json({ _id, name, email, phone, favorite });
}

// =============== Update existed contact ====================== //
async function updateContact(req, res, next) {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  console.log(contact);

  if (!contact) return next();

  res.status(200).json(contact);
}

// ============== Update contact Status by ID ============== //
async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) return next();

  res.status(200).json(contact);
}

// ============== Delete contact by ID ==================== //
async function removeContact(req, res, next) {
  const { contactId } = req.params;

  await Contact.findByIdAndDelete(contactId);

  res.status(200).json({ message: "contact deleted" });
}

export default {
  getAll: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getContactById),
  add: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateStatusContact),
  removeContactById: ctrlWrapper(removeContact),
};
