const User = require("../models/usersModel");
const { signToken } = require("./jwtServices");


const createUser = async (userData) => {
    const {email} = userData;
    const user = await User.findOne({email});
    if(user) {
        console.error('Email in use');
        throw new Error(409, "Email in use")
    }
    try {
    const newUser = await User.create(userData);
    newUser.password = undefined;

    const token = signToken(newUser.id)

    return {user: newUser, token};
    } catch(error) {
        console.error('Error creating user:', error.message);
        throw error;
    }
    
}


const loginUser = async ({email, password}) => {
    const user = await User.findOne({email}).select('+password');
    if(!user) {
        
        throw new Error(401, "Email or password is wrong");
    }

    const passwordIsValid = await user.checkPassword(password, user.password)

    if(!passwordIsValid) {
        throw new Error(401, "Email or password is wrong");
    }

    user.password = undefined;

    const token = signToken(user.id)

    return {user, token}
}

const getUserById = async(id) => {
    const user = await User.findById(id);

    if(!user) {
        throw new Error(401, "Not authorized")
    }

    const token = null
    await user.save();
    return token;
}

module.exports = {
    createUser,
    loginUser, 
    getUserById
}
