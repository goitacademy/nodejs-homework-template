const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const signup = async (username, email, password) => {
    try {
        const user = await User.findOne({ email });
        
        if (user) {
            return null;
        }
        
        const newUser = new User({ username, email });
        newUser.setPassword(password);
        await newUser.save();
        
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = signup;