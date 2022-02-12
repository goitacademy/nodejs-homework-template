const bcrypt = require('bcrypt');
const createError = require('http-errors');
const gravatar = require('gravatar')

const { User } = require('../../models');
const { signupValidator } = require('../../helpers').validators;
const {
    saltDifficult,
    HTTP_RESPONSES: {
        badRequest,
        inUse,
        created
    }
} = require('../../lib');

const signUp = async (req, res, next) => {
    try {
        const {error} = signupValidator.validate(req.body);

        if(error) {
            next(createError(badRequest.code, error.message));
        }

        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(user) {
            next(createError(inUse.code, inUse.status))
        }

        const salt = await bcrypt.genSalt(saltDifficult);
        const hashPass = await bcrypt.hash(password, salt);
        const avatarUrl = gravatar.url(email);

        await User.create({email, avatarUrl, password: hashPass});

        res.status(created.code).json({
            user: {
                email,
                status: created.status
            }
        })
    } catch (err) {
        next(err)
    }
}

module.exports = signUp;
