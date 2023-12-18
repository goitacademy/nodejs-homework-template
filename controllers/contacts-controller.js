import contactsService from "../models/contacts/index.js";
import { HttpError } from "../helpers/index.js";
import { contactAddSchema, contactUpdateSchema } from "../schemas/contact-schemas.js";
import { ctrlWrapper } from "../decorators/index.js";


const getAll = async (req, res) => {
    const result = await contactsService.listContacts();
    res.json(result);
};

const getByID = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);

    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found!`);
    };

    res.json(result);
};

const add = async (req, res) => {
    const { error } = contactAddSchema.validate(req.body);

    if (error) {
        throw HttpError(400, error.message);
    };

    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
};

const updateByID = async (req, res) => {
    const { error } = contactUpdateSchema.validate(req.body);
    const { id } = req.params;

    if (error) {
        throw HttpError(400, error.message);
    };

    const result = await contactsService.updateContact(id, req.body);
        
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found!`);
    };

    res.json(result);
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);

    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found!`);
    };

    res.json({ message: "Contact deleted" });
};

export default {
    getAll: ctrlWrapper(getAll),
    getByID: ctrlWrapper(getByID),
    add: ctrlWrapper(add),
    updateByID: ctrlWrapper(updateByID),
    deleteById: ctrlWrapper(deleteById),
};