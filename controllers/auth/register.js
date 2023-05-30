const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");


const register = async (req, res) => {

    const newUser = await User.create(req.body);

    res.json({
        email: newUser.email,
        name: newUser.name,
    })
};

module.exports = {
    register: ctrlWrapper(register)
}