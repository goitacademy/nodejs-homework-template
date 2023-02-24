const getAllContacts = require("./getAllContacts")
const getById = require("./getAllContacts")
const addContact = require("./addContact")
const deleteContact = require("./deleteContact")
const contactUpdateInfo = require("./contactUpdateInfo")
const contactUpdateFavorite = require("./contactUpdateFavorite")
module.exports = {
    getAllContacts,
    getById,
    addContact,
    deleteContact,
    contactUpdateInfo,
    contactUpdateFavorite,
}