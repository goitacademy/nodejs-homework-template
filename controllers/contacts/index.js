const {ctrlWrapper } = require("../../helpers");


const getAllContact = require("./getAllContact");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContactById =require("./updateContactById");
const updateContactFavorite =require("./updateContactFavorite");
const deleteContactById =require("./deleteContactById")




module.exports = {
    getAllContact: ctrlWrapper(getAllContact),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContactById: ctrlWrapper(updateContactById),
    updateContactFavorite: ctrlWrapper(updateContactFavorite),
    deleteContactById: ctrlWrapper(deleteContactById),
};