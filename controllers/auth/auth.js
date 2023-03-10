const { User } = require("../../model/user");
const { HttpError, controllersWrapper } = require('../../helpers');

const register = async (req, res) => {
    const newUser = await User.create(req.body);
    const {name, email, password} = newUser

    res.status(201).json({
        name,
        email,
        password
    })
}

module.exports = {
    register: controllersWrapper(register)
}