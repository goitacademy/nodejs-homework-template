const createError = require('http-errors');

const {verify} = require('../../helpers').validators;
const {User} = require('../../models');
const {setndMail} =  require('../../helpers');
const {
    notFound,
    badRequest
} = require('../../lib').HTTP_RESPONSES;
const {getMail} = require('../../helpers')


const reVerify = async(req, res, next) => {
    try {
        const {email} = req.body;
        const {error} = verify.validate(req.body);
        error && next(createError(notFound.code, notFound.status));

        const user = User.findOne({email});
        user.verify && next(createError(badRequest.code, "Verification has already been passed"))
        const mail = getMail(email, user.verificationToken)
        setndMail(mail);

        res.json({
            "message": "Verification email sent"
        })
    } catch (err) {
        next(err);
    }
}

module.exports = reVerify;