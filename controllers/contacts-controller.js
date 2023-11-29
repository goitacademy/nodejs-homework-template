import Contact from "../models/Contact.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";


const getListContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, ...filterParams } = req.query;
    const skip = (page - 1) * limit;
    const filter = { owner, ...filterParams };
    let total=0;

    const result = await Contact.find(filter, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email");
    
    res.status(200).json({
        result,
        total,
    }
    );
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOne({ _id: id, owner });
        if (!result) {
            throw HttpError(404, `Contact with id=${id} was not found`);
        }
    res.json(result);
};

const addContact = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

const updateById = async (req, res) => {
    const { id } = req.params;
     const { _id: owner } = req.user;
    const result = await Contact.findOneAndUpdate({ _id: id, owner}, req.body);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} was not found`);
        }
        res.json(result);
};


const deleteById = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndDelete({ _id: id, owner });
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