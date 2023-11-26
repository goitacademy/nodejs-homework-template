import Contact from "../models/Contact.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";


const getListContacts = async (req, res) => {
        const result = await Contact.find();
        res.json(result);
};

const getContactById = async (req, res) => {
        const { id } = req.params;
    const result = await Contact.findById(id);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} was not found`);
        }
        res.json(result)
};

const addContact = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

const updateById = async (req, res) => {
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} was not found`);
        }
        res.json(result);
};


const deleteById = async (req, res) => {
        const { id } = req.params;
        const result = await Contact.findByIdAndDelete(id);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} was not found`);
        }
        res.json({
            message: "Contact is deleted"
        })
};

export default {
    getListContacts: ctrlWrapper(getListContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}