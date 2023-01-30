const { WrongParamsError } = require("../helpers/errors");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require("../models/contacts");

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
  // try {
  //   const contacts = await listContacts();
  //   res.status(200).json(contacts);
  // } catch (error) {
  //   res.status(500).json({ error: { ...error, message: error.message } });
  // }
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    // return res
    //   .status(400)
    //   .json({ error: `Sorry, there is no contact with id: ${contactId}` });
    throw new WrongParamsError(`Not found with id=${contactId}`);
  }

  res.status(200).json(contact);

  // try {
  //   const { contactId } = req.params;
  //   const contact = await getContactById(contactId);

  //   if (!contact) {
  //     return res
  //       .status(404)
  //       .json({ error: `Sorry, there is no contact with id: ${contactId}` });
  //   }

  //   res.status(200).json(contact);
  // } catch (error) {
  //   res.status(500).json({ error: { ...error, message: error.message } });
  // }
};

const newContact = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);

  // try {
  //   const newContact = await addContact(req.body);
  //   res.status(201).json(newContact);
  // } catch (error) {
  //   res.status(500).json({ error: { ...error, message: error.message } });
  // }
};

const putContact = async (req, res) => {
  const result = await updateContact(req.params.contactId, req.body);
  res.status(200).json(result);

  // try {
  //   const isContactUpdated = await updateContact(contactId, body);

  //   if (!isContactUpdated) {
  //     return res.status(400).json({
  //       error: `Sorry, there is no contact with id: ${contactId}`,
  //     });
  //   }
  //   res.status(200).json({ id: contactId, ...body });
  // } catch (error) {
  //   res.status(500).json({ error: { ...error, message: error.message } });
  // }
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (!contact) {
    throw new WrongParamsError(`Not found with id=${contactId}`);
  }
  res.status(200).json(contact);

  // try {
  //   const contact = await removeContact(contactId);

  //   if (!contact) {
  //     return res.status(400).json({
  //       error: `Sorry, there is no contact with id: ${contactId}`,
  //     });
  //   }

  //   res.status(200).json(contact);
  // } catch (error) {
  //   res.status(500).json({ error: { ...error, message: error.message } });
  // }
};

const setFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    throw new WrongParamsError("Missing field favorite");
  }
  const result = await updateStatusContact(contactId, favorite);
  res.status(200).json(result);

  // try {
  //   const { contactId } = req.params;
  //   const { favorite } = req.body;
  //   if (!favorite) {
  //     return res.status(400).json({ message: "missing field favorite" });
  //   }

  //   const result = await updateStatusContact(contactId, favorite);

  //   return res.status(200).json(result);
  // } catch (error) {
  //   if (error instanceof mongoose.Error.CastError) {
  //     res.status(404).json({ message: "not found" });
  //   }
  //   res.status(500).json({ error: { ...error, message: error.message } });
  // }
};

module.exports = {
  getContacts,
  newContact,
  getContact,
  putContact,
  deleteContact,
  setFavorite,
};
