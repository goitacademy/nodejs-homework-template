const bcrypt = require('bcrypt');
const User = require('../../models/user');
const { HttpError } = require("../../helpers/HttpError");


const login = async (req, res) => {
    const { email, password } = req.body;

    const ckeckUser = await User.findOne({ email });

    if (!ckeckUser) {
        throw HttpError(401, "Email or password invalid");
    }

    const checkPassword = await bcrypt.compare(password, ckeckUser.password);

    if (!checkPassword) {
        throw HttpError(401, "Email or password invalid");
    }

    const token = "zxcvasdf123adsf";

    res.json(token);    
}

module.exports = login;