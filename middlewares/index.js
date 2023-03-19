const addContactMiddleware = require('./addContactMiddleware')
const changeContactMiddleware = require('./changeContactMiddleware')
const addNewUserMiddleware = require('./addNewUserMiddleware')
const authMiddleware = require('./authMiddleware')
const checedUserMiddleware = require('./checedUserMiddleware')



module.exports = {
    addContactMiddleware,
    changeContactMiddleware,
    addNewUserMiddleware,
    authMiddleware,
    checedUserMiddleware,

};