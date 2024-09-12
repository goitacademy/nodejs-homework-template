const getCurrent = async (req, res) => {
    const { email, name, subscription } = req.user;

    res.json({email, name, subscription})
}

module.exports = getCurrent;