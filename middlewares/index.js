const addContactMiddleware = require('./addContactMiddleware')
const changeContactMiddleware = require('./changeContactMiddleware')
const addNewUserMiddleware = require('./addNewUserMiddleware')
const authMiddleware = require('./authMiddleware')
const updateSubscriptionMiddleware = require('./updateSubscriptionMiddleware')



module.exports = {
    addContactMiddleware,
    changeContactMiddleware,
    addNewUserMiddleware,
    authMiddleware,
    updateSubscriptionMiddleware,

};