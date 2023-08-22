const User = require("./models/user.model");

const userLogout = async (id) =>
await User.findByIdAndUpdate(id, { token: null });


// const findUser = async (email) => await User.findOne(email)


module.exports =  userLogout;