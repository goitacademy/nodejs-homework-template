import contactsService from "../models/contacts.js";
import {HttpError} from "../helpers/index.js";
import Joi from "joi";

import {ctrlWrapper} from "../decorators/index.js";



const getAll = async (req, res, next) => {
    const result = await contactsService.listContacts();
    res.json(result)
};

const getById = async (req, res) => {
    const {id} = req.params;
    const result = await contactsService.getContactById(id);
        if(!result) {
        throw HttpError(404, `Contact with id=${id} not found`)
        }
    res.json(result)
};

const add = async (req, res) => {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
};

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.updateContact(id, req.body);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
    res.json(result);
};

const deleteById = async (req, res, next) => {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
        if (!result) {
            throw HttpError(404, `Movie with id=${id} not found`);
        }
    res.json({
        message: "Contact delete"
    })
};

export default {
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
    add: ctrlWrapper(add),
    getById: ctrlWrapper(getById),
    getAll: ctrlWrapper(getAll)
}
