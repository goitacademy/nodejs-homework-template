const { NotFound } = require('http-errors');
const { User } = require('../../models');

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.param;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw NotFound();
    }
    await User.findByIdAndUpdate(user.id,{verify:true,verificationToken: null})
    res.json({
        message: 'Verify Success';
    });
}

module.exports = verifyEmail;