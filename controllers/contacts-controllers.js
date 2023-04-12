const {Contact} = require('../models/contact')
const { HttpError } = require('../helpers')
const {controllersWrapper} = require('../decorators')

const getAllContacts = async (req, res, next) => {
    const result = await Contact.find({})
    res.json(result)
}

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId)
    if (!result) {
    throw HttpError(404, "Not found")
    }
    res.json(result)
}

const addNewContact = async (req, res, next) => {
    const result = await Contact.create(req.body)
    console.log(result)
    res.status(201).json(result)
}

  const removeContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId)
    if (!result) {
    throw HttpError(404, "Not found")
    }
    res.status(200).json({"message": "contact deleted"})
}

const updateContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if (!result) {
    throw HttpError(404, "Not found")
    }
    res.json(result)
}

const updateFavorite = async (req, res, next) => {
    if (!Object.keys(req.body).length) {
    throw HttpError(400, "Missing field favorite")
    }
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if (!result) {
    throw HttpError(404, "Not found")
    }
    res.json(result)
}
    
module.exports = {
    getAllContacts: controllersWrapper(getAllContacts),
    getContactById: controllersWrapper(getContactById),
    addNewContact: controllersWrapper(addNewContact),
    removeContactById: controllersWrapper(removeContactById),
    updateContactById: controllersWrapper(updateContactById),
    updateFavorite: controllersWrapper(updateFavorite)
}