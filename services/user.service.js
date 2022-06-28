const {User} = require('../models/user')


const updateUser = async (id, data) => {
return User.findByIdAndUpdate(id, data, {new:true})
};

const findUser = async (filters) => {
    return User.findOne(filters);
}

module.exports = { updateUser, findUser };
