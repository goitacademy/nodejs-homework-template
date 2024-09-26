import { ctrlWrapper } from "../decorators/index.js";
import contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";


const getAll = async (req, res, next) => {
    const result = await contactsService.listContacts();
    res.json(result)
};

const getById = async (req, res, next) => {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
};

const add = async (req, res, next) => {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json({
      message: "Contact deleted"
    })
};

const updateById = async (req, res, next) => {
    const { id } = req.params;
    const result = await contactsService.updateContactById(id, req.body);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
};

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}