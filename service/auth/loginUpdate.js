const { User } = require("../../models");

const loginUpdate = async (id, { token, refreshToken }) => {
    try {
        const data = await User.findByIdAndUpdate(id, { token, refreshToken }, { new: true });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = loginUpdate;
