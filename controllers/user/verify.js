const createError = require('http-errors');

const {User} = require('../../models');
const {
    HTTP_RESPONSES: {
        notFound,
    }
} = require('../../lib');

const verify = async(req, res, next) => {
    try {
        const {verificationToken} = req.params;
        const user = await User.findOne({verificationToken});

        if(!user) {
            next(createError(notFound.code, notFound.status))
        }

        await User.findByIdAndUpdate(user.id, {verify: true, verificationToken: ''})

        res.json({
            message: 'Verification successful'
        })
    } catch (err) {
        next(err)
    }
}

module.exports = verify;