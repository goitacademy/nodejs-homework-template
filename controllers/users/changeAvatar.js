const changeAvatar = async (req, res, next) => {
    const { email, subscription } = req.user;
    res.status(200).json({
        data: {
            user: { email, subscription },
        },
    });
};


module.exports = changeAvatar;