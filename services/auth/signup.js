// знаходить користувача в БД за електронною поштою (findOne({ email }))
// створює нового користувача в БД (new User) + 
// посилання на аватар за електронною поштою


const { basedir } = global;

const  gravatar = require('gravatar');

const { User } = require(`${basedir}/models/user`);

const { asyncWrapper } = require(`${basedir}/helpers`);

const signup = asyncWrapper(async ({ username, email, password }) => {
    const user = await User.findOne({ email });
        
    if (user) {
        return null;
    }
        
    const avatarURL = gravatar.url(email);

    const newUser = new User({ username, email, avatarURL });
    newUser.setPassword(password);
    await newUser.save();
});

module.exports = signup;