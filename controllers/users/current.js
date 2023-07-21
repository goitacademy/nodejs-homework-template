const { ctrlWrapper } = require("../../helpers");

const current = async (req, res) => {
    const { email, subscribtion} = req.user
    res.json({
        email,
        subscribtion,
    })
};

module.exports = ctrlWrapper(current);
