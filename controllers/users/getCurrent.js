const User = require("../../models/users");

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        status: "OK",
          code: 200,
            ResponseBody: {
                user: {
                    email,
                    subscription
                }
            }
    })
}

module.exports = getCurrent;