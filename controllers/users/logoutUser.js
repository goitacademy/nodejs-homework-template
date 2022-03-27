const usersService = require('../../services/users');

const logoutUser = async (req,res,next) => {
    try {
        const id = req.user;
        await usersService.setToken(id,null);
        res.status(204).json({});
    } catch (error) {
        next(error)
    }
}

module.exports = logoutUser;