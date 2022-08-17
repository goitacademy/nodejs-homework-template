const { User } = require("../../models");

const registerCreate = async ({
    hashPassword, email, subscription, token, role, avatarURL, verificationToken
}) => {
    try {
        const data = await User.create({
            password: hashPassword,
            email,
            subscription,
            token,
            role,
            avatarURL,
            verificationToken
        });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = registerCreate;
