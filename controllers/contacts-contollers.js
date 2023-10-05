import Contact from "../models/contact.js";
import httpError from "../helpers/httpError.js"

import {ctrlWrapper} from "../decorators/index.js";


const getAll = async (req, res, next) => {
    const result = await Contact.find();
    res.json(result)
}

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw httpError(404, "Not found")
    }
    res.json(result)
}

const addContact = async (req, res, next) => {
    const result = await Contact.create(req.body)
    res.status(201).json(result);
}

const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId)
    if (!result) {
      throw httpError(404, "Not found")
    }
    res.json({message: "contact deleted"})
}

const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body);

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