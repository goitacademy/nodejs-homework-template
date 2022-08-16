const { User } = require("../../models");

const updateUserOnVerification = async (id) => {
    try {
        const data = await User.findByIdAndUpdate(id, { verify: true, verificationToken: null }, { new: true });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = updateUserOnVerification;
