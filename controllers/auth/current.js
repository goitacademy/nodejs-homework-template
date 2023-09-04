const current = async (req, res, next) => {
    try {
        const { email, subscription } = req.user;
        return res.json({ email, subscription });
    } catch (error) {
        next(error);
    }};

    module.exports = current;