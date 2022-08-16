const { users: service } = require("../../service");
const { NotFound, BadRequest } = require("http-errors");
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../../helpers');

const verifyEmailCreate = async (req, res) => {
    const { email } = req.body;
    const verificationToken = uuidv4();
    const user = await service.findUserOnVerificationCreate({ email });
    if (!email) {
        throw new BadRequest('missing required field email');
    };
    if (!user) {
        throw new NotFound(`User was not found`);
    };
    if (user.verify === true) {
        throw new BadRequest("Verification has already been passed");
    };
    const mail = {
        to: email,
        subject: "Email confirmation",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to confirm</a>`
    };
    await sendEmail(mail);
    res.json({
        message: 'Verification email sent',
    });
};

module.exports = verifyEmailCreate;
