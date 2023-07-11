const User = require('../../models/users/users');

const verificationEmail = async (req, res) => {
    try {
        const { verificationToken } = req.params;
        const item = await User.findOne({ verificationToken });
        if (!item) {
            res.status(404).json({ message: "User not found" });
        }
        await User.findByIdAndUpdate(item.id, { verify: true, verificationToken: "" });
        res.status(200).json({ message: 'Verification successful' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Ooops... Something wrong in Verify',});
    }

}

module.exports = {
verificationEmail
}