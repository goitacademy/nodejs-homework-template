const { User } = require("../Validations/userShema")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function register(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = new User({
            email, password: await bcrypt.hash(password, 10)
        })
        const createdUser = await user.save(user);
        if (createdUser) {
            return res.status(201).json({
                user: {
                    email,
                    subscription: createdUser.subscription
                }
            });
        } else {
            return res.status(409).json({  message: "Email in use" })
        };
    } catch(err) {
        return res.status(400).json({ message: `"Помилка від Joi або іншої бібліотеки валідації" ${err.message}` });
    };
};

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({  message: "Email or password is wrong" })
        }
        const isPasswordTheSame = await bcrypt.compare(password, user.password);
        if (!isPasswordTheSame) {
            return res.status(401).json({  message: "Email or password is wrong" })
        } else {
            
            const token = jwt.sign({
                _id: user._id,
                createdAt: user.createdAt,
            },process.env.JWT_SECRET)
            return res.status(201).json({ status: "success",token });
        };
    } catch(err) {
        return res.status(400).json({ message: "Помилка від Joi або іншої бібліотеки валідації" });
    };
};

module.exports = {
    register,
    login,
}
