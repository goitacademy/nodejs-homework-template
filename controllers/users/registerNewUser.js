const {register} = require('../../services/userServices')

const registerNewUser = async(req, res) => {

    const newUser = await register(req)

    res.status(201).json({ 
        email: newUser.email,
        password: newUser.password });
};



module.exports = registerNewUser;