const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../services/contacts');

async function getContactsController(request, response) {
  const contactsList = await listContacts();

  if (!contactsList) {
    return response.status(404).json({
      status: 'Cannot get contacts',
    });
  }

  return response.status(200).json({ contactsList, status: 'success' });
}

async function getByIdController(request, response) {
  const idToFind = request.params.contactId;
  const foundContact = await getContactById(idToFind);

  if (foundContact === undefined || foundContact === false) {
    return response.status(404).json({
      status: `No contact by id:${idToFind} found`,
    });
  }

  return response.status(200).json({ foundContact, status: 'success' });
}

async function deleteContactController(request, response) {
  const idToRemove = request.params.contactId;
  const contactRemoved = await removeContact(idToRemove);

  if (contactRemoved === false) {
    return response
      .status(404)
      .json({ status: `Cannot remove contact by id ${idToRemove}` });
  }

  return response
    .status(200)
    .json({ status: `success, contact by id ${idToRemove} removed` });
}

async function addNewContactController(request, response) {
  const newContact = request.body;
  console.log(newContact);
  const contactAdded = await addContact(newContact);

  if (contactAdded === false) {
    return response.status(404).json({ status: 'Cannot add new contact' });
  }

  return response
    .status(201)
    .json({ contactAdded, status: 'success, contact added' });
}

async function changeContactController(request, response) {
  const idToChange = request.params.contactId;
  const newContactData = request.body;
  const changedContact = await updateContact(idToChange, newContactData);

  if (changedContact === false) {
    return response
      .status(404)
      .json({ status: `Cannot update contact by id:${idToChange}` });
  }

  return response
    .status(200)
    .json({ changedContact, status: 'success, contact updated' });
}

module.exports = {
  changeContactController,
  addNewContactController,
  deleteContactController,
  getByIdController,
  getContactsController,
};
