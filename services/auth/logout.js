const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const logout = async (id) => {
    try {
        const user = await User.findOne({ id });

        if (!user) {
            return null;
        }

        await User.findByIdAndUpdate(id, { token: null });

        return user;

    } catch (error) {
        console.log(error.message);
    }
};

module.exports = logout;