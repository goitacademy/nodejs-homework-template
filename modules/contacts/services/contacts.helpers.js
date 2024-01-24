import { Contact } from "../schemas/contacts.schema.js";

// Returns all contacts
async function getAll(page = 0, limit = 10) {
  const contacts = await Contact.find()
    .skip(limit * page)
    .limit(limit);
  return contacts;
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
  return Contact.create(body);
}

function update(id, body) {
  return Contact.findByIdAndUpdate(id, body);
}

function changeFavourite(id, favorite) {
  return Contact.findByIdAndUpdate(id, { favorite });
}

export { getAll, getOne, remove, create, update, changeFavourite };
