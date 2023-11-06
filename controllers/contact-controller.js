import contactService from '../models/contacts/index.js'
import { httpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js'


const getAll = async (req, res) => {

    const result = await contactService.listContacts();

    if (result.length === 0) {
        throw httpError(404, `Movies not found`);
    }
    res.status(200).json(result);

}
const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactService.getContactById(contactId);
    if (!result) {
        throw httpError(404, `Movie with ${contactId} not found`);
    }
    res.status(200).json(result);
}
const addNew = async (req, res) => {
    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
}
const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactService.updateContact(contactId, req.body);
    if (!result) {
        throw httpError(404, `Movie with ${contactId} not found`);
    }
    res.status(200).json(result);
}

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactService.removeContact(contactId);
    if (!result) {
        throw httpError(404, `Movie with ${contactId} not found`);
    }
    res.status(200).json({
        message: "contact deleted"
    });
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addNew: ctrlWrapper(addNew),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}
