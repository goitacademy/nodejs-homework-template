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
    if (!user.verify) {
        res.status(400).json({message: "Email is not verify"});
    }

    const payload = {
        id: user._id
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1w"});
    await User.findByIdAndUpdate(user._id, {token}); // записали токен в базу данных
    res.json({
        token: token,
        user: {
            email,
            subscription: "starter"
        }
    })
}

module.exports = login;