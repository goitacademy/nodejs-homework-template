const { auth: service } = require("../../service");

const logout = async (req, res) => {
    const { _id } = req.user;
    await service.logout(_id);
    res.clearCookie('refreshToken');
    res.status(204).json();
};

module.exports = logout;
