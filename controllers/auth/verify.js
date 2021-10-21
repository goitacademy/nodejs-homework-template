const { NotFound } = require('http-errors');

const { User } = require("../../models");

const verify = async (req, res) => {
    const { verifyToken } = req.params;
    const user = await User.findOne({ verifyToken });

    if (!user) {
        throw new NotFound("Verify error");
    }
    await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });

    res.json({
        status: 'success',
        code: 200,
        message: 'Email verify success'
    });

};

module.exports = verify;