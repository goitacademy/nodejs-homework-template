import * as contactsService from "../models/contacts.js"
import httpError from "../helpers/httpError.js"

import {ctrlWrapper} from "../decorators/index.js";






const getAll = async (req, res, next) => {
    const result = await contactsService.listContacts();
    res.json(result)
}

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    console.log(contactId)
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw httpError(404, "Not found")
    }
    res.json(result)
}

const addContact = async (req, res, next) => {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
}

const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw httpError(404, "Not found")
    }
    res.json({message: "contact deleted"})
}

const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);

    if (!result) {
      throw httpError(404, "Not found")
    }
    res.json(result);

}

export default {
    getAll: ctrlWrapper(getAll),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact),
}