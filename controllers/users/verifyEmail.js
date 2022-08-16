const { users: service } = require("../../service");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await service.findUserOnVerification({ verificationToken });
    if (!user) {
        throw new NotFound(`User was not found`);
    };
    await service.updateUserOnVerification(user._id);
    res.json({
        message: 'Verification successful',
    });
};

module.exports = verifyEmail;
