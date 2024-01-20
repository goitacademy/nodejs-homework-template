import { Contact } from "../schemas/contacts.schema.js";

// Returns all contacts
function getAll() {
  return Contact.find({});
}

// Returns contact with specific ID
function getOne(contactId) {
  return Contact.findById(contactId);
}

//   Removes contact
function remove(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

//   Adds new contact
function create(body) {
  const { name, phone, email, favourite } = body;
  return Contact.create({ name, email, phone, favourite });
}

function update(id, body) {
  const { name, phone, email } = body;
  return Contact.findByIdAndUpdate(id, { name, email, phone });
}

function changeFavourite(id, body) {
  const { favourite } = body;
  return Contact.findByIdAndUpdate(id, { favourite });
}

export { getAll, getOne, remove, create, update, changeFavourite };
