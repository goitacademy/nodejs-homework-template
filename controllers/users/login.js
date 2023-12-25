const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const {SECRET_KEY} = process.env;

const {User} = require('../../models/user')

const {HttpError, ctrlWrapper} = require('../../helpers')

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        throw HttpError(401, 'Email or password is wrong');
    }

    if(!user.verify) {
        throw HttpError(401, 'Email not verified');
    }

    const passwordCompare = bcrypt.compareSync(password, user.password);

    if(!passwordCompare) {
        throw HttpError(401, 'Email or password is wrong');
    }

    const payload = {id: user._id,};

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'});

    await User. findByIdAndUpdate(user._id, {token});
    
        res.status(200).json({
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