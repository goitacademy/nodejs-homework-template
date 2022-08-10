// вихід користувача


const { basedir } = global;

const { asyncWrapper } = require(`${basedir}/helpers`);

const { User } = require(`${basedir}/models/user`);

const logout = asyncWrapper(async ({ id }) => {
    const user = await User.findOne({ id });

    if (!user) {
        return null;
    }

    await User.findByIdAndUpdate(id, { token: null });

    return user;
});

module.exports = logout;