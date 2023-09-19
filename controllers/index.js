const getAllCtrl = require("./getAllCtrl")
const getContactIdCtrl = require("./getContactIdCtrl")
const postContactCtrl = require("./postContactCtrl")
const deleteContactCtrl = require("./deleteContactCtrl")
const updateContactCtrl = require("./updateContactCtrl")
const updateFavoriteCtrl = require("./updateFavoriteCtrl")
const { ctrlWrapper } = require("../helpers")


module.exports = {
    getAllCtrl: ctrlWrapper(getAllCtrl),
    getContactIdCtrl: ctrlWrapper(getContactIdCtrl),
    postContactCtrl: ctrlWrapper(postContactCtrl),
    deleteContactCtrl: ctrlWrapper(deleteContactCtrl),
    updateContactCtrl: ctrlWrapper(updateContactCtrl),
    updateFavoriteCtrl: ctrlWrapper(updateFavoriteCtrl),
}