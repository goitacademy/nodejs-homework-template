const { User } = require("../db/users");
const bCrypt = require('bcrypt')

async function registration(email,password) {
    
    
    const user = new User({ email, password})
    await user.save()
}

const login = async (contactId) => {
  
};



module.exports = {
  registration,
  login,
 
};
