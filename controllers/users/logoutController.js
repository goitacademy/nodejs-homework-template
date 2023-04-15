const { User } = require("../../service/users/userSchema");

module.exports = {
    logoutController: async(req, res) => {
        const { _id: owner } = req.user;
            await User.findByIdAndUpdate( owner, { token: "" });

        res.json({
            message: "Logout success",
        });
    }
}