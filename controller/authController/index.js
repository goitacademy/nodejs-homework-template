const registration = require('./registration')
const login = require ('./login.js')
const logout=require('./logOut')
const currentUser =require('./currentUser')

module.exports={
    registration,
    login,
    logout,
    currentUser,
}