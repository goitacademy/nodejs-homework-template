const {Contact} = require("../models/contact.js");

const {
    HttpError,
    ctrlWrapper
} = require('../helpers');

const getAllContacts = async(req, res) => {
    const result = await Contact.find();
    res.json(result);
};

const getContactById = async(req, res) => {
    const {id} = req.params;
    const result = await Contact.findById(id);
    if(!result){
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const addNewContact = async(req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

const updateContactById = async(req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result){
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const updateFavorite = async(req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result){
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const deleteContactById = async(req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if(!result){
        throw HttpError(404, "Not found");
    }
    res.json({
        message:"contact deleted"
    })
}


module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addNewContact: ctrlWrapper(addNewContact),
    deleteContactById: ctrlWrapper(deleteContactById),
    updateContactById: ctrlWrapper(updateContactById),
    updateFavorite: ctrlWrapper(updateFavorite),
};
