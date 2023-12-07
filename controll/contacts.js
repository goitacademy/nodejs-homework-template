const { errorHttp, errorMongo } = require("../error");
const { Contact } = require("../models/contacts");

const getAll = async(req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;
    const filter = { owner };
    if (favorite) {
        filter.favorite = favorite;
    }
    const result = await Contact.find(filter, "-createdAt -updatedAt", {
        skip,
        limit,
    }).populate("owner", "name email");
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
    const { _id: owner } = req.user;
    const newContact = await Contact.create({...req.body, owner });
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