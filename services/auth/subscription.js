const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const patch = async ({ id, subscription }) => {
    try { 
        const result = await User.findByIdAndUpdate(id, { subscription }, { new: true });

        return result;
        
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = patch;