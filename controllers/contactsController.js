// контроллер в отелльлном файле
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  changeContact,
} = require("../model/index");

const getContacts = async (req, res, next) => {
  const data = await listContacts();
  try {
    res.json({
      status: "success",
      code: 200,
      data,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const getContactId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    if (!data) {
      res
        .status(404)
        .json({ message: `Not correct contact with id '${contactId}` });
    }
    res.json({
      status: "success",
      code: 200,
      data,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const postContacts = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const data = await addContact(name, email, phone);
    res.status(201).json({
      status: "success",
      code: 201,
      contact: data,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await removeContact(contactId);
    res.status(201).json({
      status: "success",
      code: 201,
      message: `contact '${contactId}' deleted`,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
const putContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  try {
    await updateContact(contactId, name, email, phone);
    res.status(201).json({
      status: "success",
      code: 201,
      message: `contact '${contactId}' changed`,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
const patchContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  try {
    await changeContact(contactId, name, email, phone);
    res.status(201).json({
      status: "success",
      code: 201,
      message: `contact '${contactId}' changed`,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

module.exports = {
  getContacts,
  getContactId,
  postContacts,
  deleteContact,
  putContact,
  patchContact,
};
