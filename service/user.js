const User = require("./schema/user");

const getUserByEmail = async (email) => {
    return User.findOne({email});
};
const getUserByVerificationToken = async (token) => {
    return User.findOne({verificationToken: token});
};
const verifyUser = (id) => {
    
    return User.updateOne({_id: id},{verify: true, verificationToken: null},
)}

module.exports = {
    getUserByEmail,
    getUserByVerificationToken,
    verifyUser,
};
    