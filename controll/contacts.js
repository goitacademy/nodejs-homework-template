const { errorHttp, errorMongo } = require("../error");
const { Contact } = require("../models/contacts");

const getAll = async(_, res) => {
    const result = await Contact.find();
    console.log(result);
    res.json(result);
};

const getById = async(req, res) => {
    const { contactId } = req.params;
    console.log(contactId);
    const contact = await Contact.findById(contactId).exec();
    if (!contact) {
        throw errorHttp(404, "Not found");
    }
    res.json(contact);
};

const add = async(req, res) => {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
};

const deleteById = async(req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndDelete({ _id: contactId });

    if (!contact) {
        throw errorHttp(404, "Not found");
    }
    res.json({ message: "contact deleted" });
};

const updateById = async(req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });

    if (!contact) {
        throw errorHttp(404, "Not found");
    }
    res.json(contact);
};

const updateFavorite = async(req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findOneAndUpdate({ _id: contactId }, req.body, {
        new: true,
    });

    if (!contact) {
        throw errorHttp(404, "Not found");
    }
    res.json(contact);
};

module.exports = {
    getAll: errorMongo(getAll),
    getById: errorMongo(getById),
    add: errorMongo(add),
    updateById: errorMongo(updateById),
    deleteById: errorMongo(deleteById),
    updateFavorite: errorMongo(updateFavorite),
};