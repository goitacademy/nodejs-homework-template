const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactService");

const listContactsController = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const data = await listContacts(_id);
    return res.json({
      status: "success",
      code: 200,
      data,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const getContactByIdController = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  try {
    const data = await getContactById(_id, contactId);
    return res.json({
      status: "success",
      code: 200,
      data,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const addContactController = async (req, res) => {
  try {
    const { _id } = req.user;
    const data = await addContact(_id, req.body);
    res.status(201).json({ data });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const removeContactController = async (req, res) => {
  try {
    const { _id } = req.user;
    const { contactId } = req.params;
    await removeContact(_id, contactId);
    res.status(200).json({ message: "contact was deleted" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const updateContactController = async (req, res) => {
  try {
    const { _id } = req.user;
    const { contactId } = req.params;
    const data = await updateContact(_id, contactId, req.body);
    res.status(200).json({ status: "success", code: 200, data });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const updateStatusContactController = async (req, res) => {
  try {
    const { _id } = req.user;
    const { contactId } = req.params;
    const data = await updateStatusContact(_id, contactId, req.body);
    res.status(200).json({ status: "success", code: 200, data });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
};
