
const createUser = require('./createUser');
const loginUser = require('./loginUser');
const auth = require('./auth');
const authUser = require('./authUser');
const logOut = require('./logOut');
const current = require('./current');

  module.exports = {...createUser, ...loginUser, ...auth, ...authUser, ...logOut, ...current}