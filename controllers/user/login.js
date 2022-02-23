const bcrypt = require('bcrypt');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const {SECRET_KEY} = process.env;
const { User } = require('../../models');
const { signupValidator } = require('../../helpers').validators;
const {
    badRequest,
    wrongCredentials,
    notVerify
} = require('../../lib').HTTP_RESPONSES;

const tokenTime = '1h';

const login = async (req, res, next) => {
    try{
        const {error} = signupValidator.validate(req.body)

        if(error) {
            next(createError(badRequest.code, error.message));
        }

        const {email, password} = req.body;

        const user = await User.findOne({email});

        !user && next(createError(wrongCredentials.code, wrongCredentials.status));

        if(!user.verify) {
            next(createError(notVerify.code, notVerify.status))
        }

        const compareResult = await bcrypt.compare(password, user.password);

        !compareResult && next(createError(wrongCredentials.code, wrongCredentials.status));

        const payload = {
            id: user._id
        }

        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: tokenTime});
        await User.findByIdAndUpdate(user.id, {token})

        res.json({token, user:{email}})
    } catch (err) {
        next(err)
    }
}

module.exports = login;
