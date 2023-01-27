const {
  addContact,
  getContactById,
  removeContact,
  updateContact,
  listContacts,
} = require("../models/contacts");

const getContacts = async (_, res) => {
  const data = await listContacts();
  res.status(200).json({ status: `Successfully!`, statusCode: 200, data });
};

const getContById = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data.length) {
    return res.status(404).json({
      message: `Contact with id: ${contactId} not found`,
      statusCode: 404,
    });
  }
  res.status(200).json({ code: 200, data });
};

const addCont = async (req, res) => {
  const body = req.body;
  const data = await addContact(body);
  res.status(201).json({
    status: `Contact added successfully!`,
    code: 201,
    data,
  });
};

const deleteCont = async (req, res) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);

  if (!data) {
    return res.status(404).json({
      message: `Contact with id ${contactId} not found!`,
      code: 404,
    });
  }

  res.status(200).json({
    message: "Contact deleted successfully!",
    code: 200,
    data,
  });
};

const updateCont = async (req, res) => {
  const { contactId } = req.params;
  const contact = req.body;

  const data = await updateContact(contactId, contact);

  if (!data) {
    return res.status(404).json({
      status: `Failure, no contact with id ${contactId} found!`,
      statusCode: 404,
    });
  }
  res.status(200).json({
    status: `Contact with id ${contactId} change successfully!`,
    statusCode: 200,
    data,
  });
};

module.exports = {
  getContacts,
  getContById,
  addCont,
  deleteCont,
  updateCont,
};
