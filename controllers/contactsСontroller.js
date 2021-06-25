const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../services/contactsServices');

async function getContactsController(request, response) {
  const { _id: userId } = request.user;

  const contactsList = await listContacts(userId);

  return response.status(200).json({ contactsList, status: 'success' });
}

async function getByIdController(request, response) {
  const idToFind = request.params.contactId;
  const { _id: userId } = request.user;

  const foundContact = await getContactById(userId, idToFind);

  return response.status(200).json({ foundContact, status: 'success' });
}

async function deleteContactController(request, response) {
  const idToRemove = request.params.contactId;
  const { _id: userId } = request.user;

  await removeContact(idToRemove, userId);

  return response
    .status(200)
    .json({ status: `success, contact by id ${idToRemove} removed` });
}

async function addNewContactController(request, response) {
  const newContact = request.body;
  const { _id: userId } = request.user;

  const contactAdded = await addContact(newContact, userId);

  return response
    .status(201)
    .json({ contactAdded, status: 'success, contact added' });
}

async function changeContactController(request, response) {
  const idToChange = request.params.contactId;
  const newContactData = request.body;
  const { _id: userId } = request.user;

  const changedContact = await updateContact(
    idToChange,
    newContactData,
    userId,
  );

  return response
    .status(200)
    .json({ changedContact, status: 'success, contact updated' });
}

async function changeFavouriteController(req, res) {
  const idToChange = req.params.contactId;
  const newFavouriteData = req.body;
  const changedContact = await updateStatusContact(
    idToChange,
    newFavouriteData,
  );

  return res
    .status(200)
    .json({ changedContact, status: 'success, contact updated' });
}

module.exports = {
  changeContactController,
  addNewContactController,
  deleteContactController,
  getByIdController,
  getContactsController,
  changeFavouriteController,
};
