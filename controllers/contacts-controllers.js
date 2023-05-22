const { boolean } = require("joi");
const HttpError = require("../helpers/HttpError");

const { Contact } = require("../models/contact");

const ctrlWrapper = require("../utils/ctrlWrapper");

const getAllContacts = async (req, res, next) => {
    // const { _id } = req.user;
    const { page = 1, limit = 5, favorite = false } = req.query;
    const skip = (page - 1) * limit;
    // const query = {
    //     owner: _id,
    // };
    // if (favorite) {
    //     query.favorite = favorite;
    // }
    //в Contact.find:
    //первый аргумент (долже быть объект) - показать контакты в котором есть данное поле / значение
    // второй аргумент - string какие поля показать или исключить если со знаком -
    // третий аргумент (должен быть объект) - пагинация. skip и limit зарезервированные слова
    const result = await Contact.find({}, "-createdAt -updatedAt", { skip, limit });
    res.json(result);
};

const getOneContact = async (req, res) => {
    const { contactId } = req.params;
    // const result = await Contact.findOne({ _id: contactId });
    const result = await Contact.findById(contactId);
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

const addNewContact = async (req, res) => {
    const { _id: owner } = req.user;

    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw HttpError(404);
    }
    res.json({ message: "contact deleted" });
};

const changeContact = async (req, res) => {
    const isBody = Object.keys(req.body);
    if (isBody.length === 0) {
        throw HttpError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

const changeFavorite = async (req, res) => {
    const isBody = Object.keys(req.body);
    if (isBody.length === 0) {
        throw HttpError(400, "missing field favorite");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    addNewContact: ctrlWrapper(addNewContact),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    changeContact: ctrlWrapper(changeContact),
    changeFavorite: ctrlWrapper(changeFavorite),
};
