const getCurrent = async (req, res) => {
    const { email, password } = req.user;
    res.json({
        email,
        password,
    });
};

module.exports = getCurrent;
