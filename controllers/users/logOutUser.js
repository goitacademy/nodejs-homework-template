const {logout} = require('../../services/userServices')

const logOutUser = async(req,res) => {

    await logout(req);
    res.status(204).json();
};

module.exports = logOutUser;