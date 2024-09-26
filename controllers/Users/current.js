const getCurrent = async (req, res, next) => {
    const { email } = req.user
    res.json({
        email,
    })
};

module.exports = {
  getCurrent,
};
