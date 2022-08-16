const { User } = require("../../models");

const updateUserSubscription = async (id, { subscription }) => {
    try {
        const data = await User.findByIdAndUpdate(id, { subscription }, { new: true });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = updateUserSubscription;
