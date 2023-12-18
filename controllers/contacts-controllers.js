import { controllerWrapper } from "../decorators/controllerWrapper.js";
import contactsService from "../services/contacts.js";

const getAllContacts = controllerWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const contacts = await contactsService.listContacts({ owner });
  res.json(contacts);
});

const getContactById = controllerWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const contact = await contactsService.getContactById({
    _id: contactId,
    owner,
  });

  res.json(contact);
});

const addNewContact = controllerWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const newContact = await contactsService.addContact({ ...req.body, owner });

  res.status(201).json(newContact);
});

const updateContactById = controllerWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateContact(
      {
      _id: contactId,
      owner,
    },
    req.body
  );

  res.json(updatedContact);
});

const deleteContactById = controllerWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  await contactsService.removeContact({
    _id: contactId,
    owner,
  });

  res.json({ message: "Contact deleted" });
});

export default {
  getAllContacts,
  getContactById,
  addNewContact,
  updateContactById,
  deleteContactById,
};
