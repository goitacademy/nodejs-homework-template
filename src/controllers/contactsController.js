const { Contact } = require("../db");

const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContact,
  changeContactStatus,
} = require("../services");

// process a request for contacts list statehood

const getContactsController = async (req, res) => {
  const contacts = getContacts();
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
  const { name, email, phone, favorite } = req.body;
  const isFavorite = favorite || false;
  const contact = new Contact({ name, email, phone, favorite: isFavorite });
  await contact.save();
  res.json({ status: "success" });
};

// process a request to delete contact by ID

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const isRemovalSuccessful = await Contact.findByIdAndRemove(contactId);
  res.json({
    message: isRemovalSuccessful ? "contact deleted" : "Not found",
    status: isRemovalSuccessful ? 200 : 404,
  });
};

// process a request to modify some or every fields in contact

const changeContactController = async (req, res) => {
  const { contactId } = req.params;
  // const { name, email, phone, favorite } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body);

  res.status(200).json({
    message: `contact ${contactId} was successfully updated`,
    contact: updatedContact,
  });
};

const changeContactStatusController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    res.json({ status: 400, message: "missing field favorite" });
    return;
  }
  const updateStatusContact = await Contact.findByIdAndUpdate(
    contactId,
    favorite
  );

  res.status(200).json({
    message: `contact ${contactId} was successfully updated`,
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
