const { User } = require('../../models');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '../../', '.env');
dotenv.config({ path: envPath });
const { SECRET_KEY } = process.env;
// // console.log(SECRET_KEY);
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const compPassword = bcrypt.compareSync(password, user.password);
    if (!user || !user.verify || !compPassword) {
        throw new Unauthorized("Email is wrong or not verify, or password is wrong");
    }
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
    // При авторизації користувача записуємо токен в базу
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
        token,
        user
    })
}


module.exports = login;