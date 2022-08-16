const { User } = require("../../models");

const funcRefreshToken = async (id, { newRefreshToken }) => {
    try {
        const data = await User.findByIdAndUpdate(id, {refreshToken:newRefreshToken}, { new: true });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = funcRefreshToken;
