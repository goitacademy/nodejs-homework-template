// передплата користувача


const { basedir } = global;

const { asyncWrapper } = require(`${basedir}/helpers`);

const { User } = require(`${basedir}/models/user`);

const patch = asyncWrapper(async ({ id, subscription }) => {
    const result = await User.findByIdAndUpdate(id, { subscription }, { new: true });

    return result;
});

module.exports = patch;