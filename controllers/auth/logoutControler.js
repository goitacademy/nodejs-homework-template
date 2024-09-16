const bcrypt = require('bcryptjs');
const User = require('../../models/users/users');


const logout = async (req, res) => {
    try {
        const { id } = req.user;
        await User.findByIdAndUpdate(id, { token: null });
        return res.status(204).json({ message: 'Ooops... Something wrong in DB'});
    } catch (err) {
         res.sendStatus(500).json({ message: 'Ooops... Something wrong in DB'});
    }
}

module.exports = {
    logout
}