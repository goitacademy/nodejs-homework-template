const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;

    return res.json({
        status: 'Success',
        code: 200,
        message: 'Current user exists',
        data: {
            user: {
                email,
                subscription,
            },
        },
    });
};

module.exports = getCurrent;