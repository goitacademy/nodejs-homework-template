// знаходить користувача в БД за електронною поштою (findOne({ email }))
// створює нового користувача в БД (new User) + 
// посилання на аватар за електронною поштою
// verificationToken для користувача, записує його в БД,
// для генерації токену - пакет uuid

const { basedir } = global;

const  gravatar = require('gravatar');

const { v4 } = require('uuid');

const { User } = require(`${basedir}/models/user`);

const { asyncWrapper } = require(`${basedir}/helpers`);

const signup = asyncWrapper(async ({ username, email, password }) => {
    const user = await User.findOne({ email });
        
    if (user) {
        return null;
    }
        
    const verificationToken = v4();

    const avatarURL = gravatar.url(email);

    const newUser = new User({ username, email, avatarURL, verificationToken });
    newUser.setPassword(password);
    await newUser.save();
});

module.exports = signup;