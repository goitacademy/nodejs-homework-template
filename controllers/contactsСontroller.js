const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../model/index');

async function getContacts(request, response) {
  const contactsList = listContacts();

  if (!contactsList) {
    return response.status(404).json({
      status: `Cannot get contacts`,
    });
  }

  return response.status(200).json({ contactsList, status: 'success' });
}

async function getById(request, response) {
  const idToFind = request.params.id;
  const foundContact = getContactById(idToFind);

  if (!foundContact) {
    return response.status(404).json({
      status: `No contact by ${idToFind} found`,
    });
  }

  return response.status(200).json({ foundContact, status: 'success' });
}

async function deleteContact(request, response) {
  const idToRemove = request.params.id;
  const contactRemoved = removeContact(idToRemove);

  if (contactRemoved === false) {
    return response
      .status(404)
      .json({ status: `Cannot remove contact by id ${idToRemove}` });
  }

  return response.status(200).json({ status: 'success, contact removed' });
}

async function addNewContact(request, response) {
  const newContact = request.body;
  const contactAdded = addContact(newContact);

  if (contactAdded === false) {
    return response.status(404).json({ status: `Cannot add new contact` });
  }

  return response.status(200).json({ status: 'success, contact added' });
}

async function changeContact(request, response) {
  const idToChange = request.params.id;
  const newContactData = request.body;
  const changedContact = updateContact(idToChange, newContactData);

  if (changedContact === false) {
    return response
      .status(404)
      .json({ status: `Cannot update contact by id ${idToChange}` });
  }

  return response.status(200).json({ status: 'success, contact updated' });
}

module.exports = {
  changeContact,
  addNewContact,
  deleteContact,
  getById,
  getContacts,
};
