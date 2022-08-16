const { User } = require("../../models");

const registerFind = async ({ email }) => {
    try {
        const data = await User.findOne({ email });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = registerFind;
