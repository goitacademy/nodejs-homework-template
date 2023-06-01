const { HttpError, ctrlWrapper } = require('../helpers');

const contacts = require('../models/contacts');

const getAll = async (req, res) => {
    const result = await contacts.listContacts();
    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        },
    });
}

const getById = async (req, res) => {
    const { contactId } = req.params;
    const oneContact = await contacts.getContactById(contactId);
    if (oneContact === null) {
      throw HttpError(404, "Not found");
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        oneContact
      },
    });
}

const add = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {result},
    })
}

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const updatedContact = await contacts.updateContact(contactId, req.body);
    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    res.json({ 
      status: 'success',
      code: 200,
      data: {
        updatedContact
      }
    })
}

const remove = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json({message: "Contact deleted"})
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    remove: ctrlWrapper(remove)
}