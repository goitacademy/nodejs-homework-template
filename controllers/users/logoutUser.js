const UsersService = require('../../services/users');
const usersService = new UsersService();

const logoutUser = async (req,res) => {
    try {
        const id = req.user;
        console.log(id);
        await usersService.setToken(id,null)
        res.status(204).json({});
    } catch (error) {
        res.status(400).json({message:error.message, code:400})
    }
}

module.exports = logoutUser;