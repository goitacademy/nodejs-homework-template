const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const {SECRET_KEY} = process.env;

const {User} = require('../../models/user')

const {HttpError, ctrlWrapper} = require('../../helpers')

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        throw HttpError(401, 'message": "Email or password is wrong');
    }

    const passwordCompare = bcrypt.compareSync(password, user.password);

    if(!passwordCompare) {
        throw HttpError(401, 'message": "Email or password is wrong');
    }

    const payload = {id: user._id,};

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'});

    res.status(201).json({
        "token": token,
        "user": {
            "email": user.email,
            "subscription": "starter"
        }
    })
}

module.exports = {
    login: ctrlWrapper(login),
}