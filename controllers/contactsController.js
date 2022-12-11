const contactsModel = require('../service/index');

const getAllContacts = async (req, res) => {
  const contacts = await contactsModel.listContacts();

  res
    .status(200)
    .json({
      data: {contacts},
    });
};

const getContactById = async (req, res) => {
  const {contactId} = req.params;
  const contact = await contactsModel.getContactById(contactId);

  if (!contact) {
    notFoundId(res, contactId);
    return;
  }

  res
    .status(200)
    .json({
      data: {contact},
    });
};

const addContact = async (req, res) => {
  const {name, email, phone} = req.body;
  const contact = await contactsModel.addContact({name, email, phone});

  res
    .status(201)
    .json({
      data: {contact},
      message: `Contact by id: ${contact.id} has been added`,
    });
};

const delContactById = async (req, res) => {
  const {contactId} = req.params;
  const contact = await contactsModel.removeContact(contactId);
  if (!contact) {
    notFoundId(res, contactId);
    return;
  }

  res
    .status(200)
    .json({
      data: {contact},
      message: `Contact by id: ${contact.id} has been deleted`,
    });
};

const updateContactById = async (req, res) => {
  const {contactId} = req.params;
  const contact = await contactsModel.removeContact(contactId);
  if (!contact) {
    notFoundId(res, contactId);
    return;
  }

  res
    .status(200)
    .json({
      data: {contact},
      message: `Contact by id: ${contact.id} has been update`,
    });
};

module.exports = {
  getAllContacts, getContactById, addContact, delContactById, updateContactById
};

function notFoundId(res, id) {
  const code = 404;
  res.status(code);
  res.json({
    data: {},
    message: `Contact by id: ${id} hasn't been found`,
    status: 'error', code
  });
}
