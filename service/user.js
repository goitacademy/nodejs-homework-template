const User = require("./schemas/user");


const createUser = ({ email, password }) => {
    return User.create({ email, password });
  };

  

  
module.exports = {

    createUser,

  };