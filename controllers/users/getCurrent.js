const { User } = require("../../model/users");
const getCurrent = async(req, res) => {
    const { name, email } = req.user;
    res.json({
        status: "succsess",
        code: 200,
        data: {
            user: {
                name,
                email,
            },
        },
    });
};

module.exports = getCurrent;