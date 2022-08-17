const { User } = require('../../models');

const updateUserAvatar = async (id, { avatarURL }) => {
    try {
        const data = await User.findByIdAndUpdate(id, { avatarURL }, { new: true });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = updateUserAvatar;
