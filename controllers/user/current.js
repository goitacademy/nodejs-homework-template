
const current = async (req, res, _) => {
    res.json({
        email: req.body.email,
        subscription: "starter"
    })
};

module.exports = current;
