const current = async (req, res, next) => {
    const { email, subscription } = req.user
    if (!req.user) {
        return res.status(401).json({
            status: 'error',
            code: 401,
            message: "Email or password is wrong"
        });
    }
    res.status(200).json({
        status: 'success',
        code: 200,
        data: {
            user: {
                email,
                subscription
            },
        },
    });
}

module.exports = current