const {getAllContacts} = require('./contacts');
const {addContact} = require('./contacts');
const {getContactById} = require('./contacts');
const {deleteContact} = require('./contacts');
const {updateContact} = require('./contacts');
const {updateStatusContact} = require('./contacts');
const {register} = require('./auth');
const {login} = require('./auth');
const {getCurrent} = require('./auth');
const {logout} = require('./auth');
const {updateUserSubscription} = require('./auth');
const {updateAvatar} = require('./auth');


module.exports = {
    getAllContacts,
    addContact,
    getContactById,
    deleteContact,
    updateContact,
    updateStatusContact,
    register,
    login,
    getCurrent,
    logout,
    updateUserSubscription,
    updateAvatar,
};