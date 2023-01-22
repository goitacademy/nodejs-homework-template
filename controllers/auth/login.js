const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');

const { SECRET_KEY } = process.env;


const login = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email}); // проверяем имейл
        if (!user) {
            throw HttpError(401, "Email or password invalid");
        }

        if (!user.verify) { // проверим верификацию Email при залогинивании 
            throw HttpError(401, 'Email not verify');
        }

        const passwordCompare = await bcrypt.compare(password, user.password) // проверяем пароль
        if (!passwordCompare) {
            throw HttpError(401, "Email or password invalid");
        }

        const payload = {
            id: user._id,
        }

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
        await User.findByIdAndUpdate(user._id, { token });// добавим токен в базу 

        res.json({
            status: "OK",
            code: 200,
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            }
        })
    } catch (error) {
        next(error);  
    }
}

module.exports = login;