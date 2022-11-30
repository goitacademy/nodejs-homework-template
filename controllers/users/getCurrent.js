const { User } = require("../../model");

const getCurrent = async(req, res) => {
    const { password,  email} = req.user;

    res.json({
        status: "success",
        code: 200,
        data: {
            user: {
                email,
                subscription: "starter"
            }
        }
    })
}

module.exports = getCurrent; 
