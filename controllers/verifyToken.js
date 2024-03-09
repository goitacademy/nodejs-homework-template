const { User } = require("../models/schema");
require("colors");

const verifyToken = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
        return res.json({
        status: "error",
        code: 404,
        message: "User whit this verificationToken does not exist",
        });
    }

    try {
        await User.updateOne(
        { verificationToken },
        { verificationToken: null, verify: true }
        );
        console.log("Your email has been verified, enjoy.".green);
        res.json({
        status: "success",
        code: 200,
        data: { verificationToken },
        message: "User has been verified",
        });
    } catch (error) {
        res.json({
        status: "error",
        code: 400,
        message: "Bad Request",
        });
    }
};

module.exports = { verifyToken };
