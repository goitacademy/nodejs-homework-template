const {User} = require('../models/user')


const updateUser = async (id, data) => {
return User.findByIdAndUpdate(id, data, {new:true})
};

module.exports={updateUser}