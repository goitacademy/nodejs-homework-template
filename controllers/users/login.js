const {User} = require("../../models/users");

 const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const {email, password } = req.body;

    const user = await User.findOne({email});

    if (!user){
        return res.status(401).json({
            message: "Email or password is wrong"
        });
    }

    const passCompare = bcrypt.compareSync(password,user.password);
    if (!passCompare){
        return res.status(401).json({
                    message: "Email or password is wrong"
                });
    }

    const payload = {
        id: user._id
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1h"});
    res.json({
        token: token,
        user: {
            email,
            subscription: "starter"
        }
    })
}

module.exports = login;