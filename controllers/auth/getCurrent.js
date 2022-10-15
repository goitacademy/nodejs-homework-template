const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        ststus: 'success',
        code: 200,
        data: {
            email,
            subscription
        }
    })
};

module.exports = getCurrent;