const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../repository");

const getListContacts = async (_req, res, _next) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { contacts },
    message: "router.get is OK",
  });
};

const getContact = async (req, res, _next) => {
  const contact = await getContactById(req.params.contactId);

  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      data: { contact },
      message: `${contact.name} found`,
    });
  } else {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `${contact.name} not found`,
    });
  }
};

const saveContact = async (req, res, _next) => {
  const contact = await addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { contact },
    message: `${contact.name} added`,
  });
};

const deleteContact = async (req, res, _next) => {
  const { contactId } = req.params;
  const remove = await removeContact(contactId);

  if (remove === false) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "/:contactId not found",
    });
  } else {
    res.json({ message: "router.delete is OK" });
  }
};

const changeContact = async (req, res, _next) => {
  const contact = await updateContact(req.params.contactId, req.body);

  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      data: { contact },
      message: `${contact.name} updated`,
    });
  } else {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "contact not found",
    });
  }
};

const changeStatusContact = async (req, res) => {
  const id = req.params.contactId;
  const body = req.body;

  if (!body) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  try {
    const result = await updateStatusContact(id, body);

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
      message: "Contact status was updated",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getListContacts,
  getContact,
  saveContact,
  deleteContact,
  changeContact,
  changeStatusContact,
};
