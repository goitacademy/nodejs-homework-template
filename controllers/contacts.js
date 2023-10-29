//import { Contact } from "../../models/contact.js";
import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapeer.js";

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const {
        page = 1,
        limit = 20,
        favorite: reqFavorite = null,
        phone: reqPhone = null,
    } = req.query;
    const skip = (page - 1) * limit;
    const favorite = reqFavorite === null ? { $exists: true } : reqFavorite;
    const phone = reqPhone === null ? { $exists: true } : reqPhone;

    const result = await Contact.find(
        { owner, favorite, phone },
        "-createdAt -updatedAt",
        {
            skip,
            limit,
        }
    ).populate("owner", "name email");

    res.json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOne({ _id: id, owner });
    console.log(result);
    if (!result) {
        throw HttpError(404, "Sorry. Not found.");
    }
    res.json(result);
};

const postAddContact = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndRemove({ _id: id, owner });
    if (!result) {
        throw HttpError(404, "Sorry:) Not found.");
    }
    res.json({ message: "contact deleted" });
};

const putUpdateById = async (req, res) => {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, {
        new: true,
    });
    if (!result) {
        throw HttpError(404, "Sorry. Not found.");
    }
    res.json(result);
};

const patchUpdateById = async (req, res) => {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, {
        new: true,
    });
    if (!result) {
        throw HttpError(404, "Sorry. Not found.");
    }
    res.json(result);
};

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    postAddContact: ctrlWrapper(postAddContact),
    deleteById: ctrlWrapper(deleteById),
    putUpdateById: ctrlWrapper(putUpdateById),
    patchUpdateById: ctrlWrapper(patchUpdateById),
};