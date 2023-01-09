// const {User} = require("../../models")
const getCurrent = async (req, res) => {
    const { email, password, subscription } = req.user;
    res.json({
        status: "success",
        code: 200,
        data: {
            user: {
                email,
                password,
                subscription
            }
        }
    })
};

module.exports = getCurrent;