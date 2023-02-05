const createError = require('http-errors');
const { 
    listContacts, 
    getContactById, 
    addContact, 
    removeContact, 
    updateContact, 
    updateContactStatus,
} = require('../service/contactsService');

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await listContacts({ _id, skip, limit });
  res.status(200).json({ data: contacts });
};


const getById = async (req, res, next) => {
    const { id } = req.params;
    const contactById = await getContactById(id);

    if (!contactById) {
      return next(createError(404, 'Not found'));
    }

    res.status(200).json({ data: contactById });
}


const add = async (req, res, next) => {
  const { _id } = req.user;
  const { name, email, phone } = req.body;
  const newContact = await addContact({ name, email, phone, _id });
  res.status(201).json({ data: newContact });
};


const remove = async (req, res, next) => {
    const { id } = req.params;
    const contactDeleted = await removeContact(id);

    if (!contactDeleted) {
      return next(createError(404, "Not found"));
    }

    res.status(200).json({ message: "contact deleted" });
}


const updateById = async (req, res, next) => {
    const { id } = req.params;
    const contactUpdated = await updateContact(id, req.body);

    if (!contactUpdated) {
      return next(createError(404, "Not found"));
    }

    res.status(200).json({ data: contactUpdated });
}


const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const contactUpdatedStatus = await updateContactStatus(id, req.body.favorite);

  if (!contactUpdatedStatus) {
    return next(createError(404, "Not found"));
  }

  res.status(200).json({ data: contactUpdatedStatus });
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  updateById,
  updateStatus,
};