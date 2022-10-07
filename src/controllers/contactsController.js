const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContact,
} = require("../services");

// process a request for contacts list statehood

const getContactsController = async (req, res) => {
  const contacts = await getContacts();
  res.json({ contacts });
};

// process the request for a specific contact by ID

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const targetedContact = await getContactById(contactId);
  res.json({
    contact: targetedContact || {},
    message: targetedContact
      ? "success"
      : `Failure, no contact with id ${contactId} found`,
    status: targetedContact ? 200 : 404,
  });
};

// process a request to add a new contact to the list

const addContactController = async (req, res) => {
  const contact = await addContact(req.body);

  res.json({
    status: "success",
    message: `Contact ${contact.name} was successfully added`,
  });
};

// process a request to delete contact by ID

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);
  const isRemovalSuccessful = !!contact;

  res.json({
    message: isRemovalSuccessful
      ? `contact ${contactId} was successfully deleted`
      : `contact ${contactId} not founded`,
    status: isRemovalSuccessful ? 200 : 404,
  });
};

// process a request to modify some or every fields in contact

const changeContactController = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await changeContact(contactId, req.body);

  res.status(200).json({
    message: `contact ${contactId} was successfully updated`,
    contact: updatedContact,
  });
};

const changeContactStatusController = async (req, res) => {
  const { contactId } = req.params;

  const updateStatusContact = await changeContact(contactId, req.body);

  res.status(200).json({
    message: `Status of contact ${contactId} was successfully updated`,
    contact: updateStatusContact,
  });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
  changeContactStatusController,
};
