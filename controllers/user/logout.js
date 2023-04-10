const Users = require('../../models/user/usersSchema');

const logout = async (req, res, next) => {
    try {
        const { _id } = req.user;
        
        await Users.findByIdAndUpdate(_id, { token: null });
        
    res.status(204).json()
        
    } catch (err) {
        next(err);
    }
  
};

module.exports = logout;