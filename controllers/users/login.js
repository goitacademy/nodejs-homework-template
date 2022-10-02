
const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;


const login = async (req, res) => {
 
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw RequestError(401, `Email ${email} not found`);
    };
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!passCompare) {
        throw RequestError(401, "Password is wrong");
    };
    const payload = {
        id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        status: "success",
        code: 200,
        data: {
           token
        }

    })

};


module.exports = login;