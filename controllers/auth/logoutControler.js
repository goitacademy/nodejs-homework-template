const bcrypt = require('bcryptjs');
const User = require('../../models/users/users');


const logout = async (req, res) => {
    try {
        const { id } = req.user;
        await User.findByIdAndUpdate(id, { token: null });
        return res.status(204).json({ message: 'Logout cuscess'});
    } catch (err) {
         res.status(500);
    }
}

module.exports = {
    logout
}