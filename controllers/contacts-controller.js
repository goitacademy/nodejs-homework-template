
const { HttpError } = require('../helpers/index');

const { ctrlWrapper } = require('../decorators/index');

const getAll = async (res) => {

    const result = await contactsService.listContacts();
    res.json(result);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    console.log('result', result);
    if (!result) {
        throw HttpError(404, "Contact with id=${contactId} not found");
    }
    res.json(result);
}

const add = async (req, res) => {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
}

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsService.updateContactById(contactId, req.body);
    if (!result) {
        throw HttpError(404, "Contact with id=${contactId} not found");
    }
    res.json(result);
}

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
        throw HttpError(404, "Contact with id=${contactId} not found");
    }
    res.status(200).json({
        message: "Contact deleted"
    });
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}