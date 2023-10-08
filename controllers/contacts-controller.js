import { HttpError } from "../helpers/index.js";
import { ContactDB } from "../models/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
    const result = await ContactDB.find();
    res.json(result);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await ContactDB.findById(contactId);
    if (!result) throw HttpError(404, "Contact not found");
    res.json(result);
};

const add = async (req, res) => {
    const result = await ContactDB.create(req.body);
    res.status(201).json(result);
};

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await ContactDB.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });
    if (!result) throw HttpError(404, "Contact not found");
    res.status(200).json(result);
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await ContactDB.findByIdAndDelete(contactId);
    if (!result) throw HttpError(404, "Contact not found");
    res.status(200).json({ message: "Contact deleted" });
};

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
};