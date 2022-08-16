const { User } = require("../../models");

const logout = async (id) => {
    try {
        const data = await User.findByIdAndUpdate(id, { token: null, refreshToken: null });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = logout;
