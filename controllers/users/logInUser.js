const {login} = require('../../services/userServices')

const logInUser = async(req,res) => {

    const result = await login(req);

    res.json({result})
};


module.exports = logInUser;