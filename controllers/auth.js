const {User} = require('../models/user')
const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) =>{

}

module.exports = {
    register: ctrlWrapper(register),
}
