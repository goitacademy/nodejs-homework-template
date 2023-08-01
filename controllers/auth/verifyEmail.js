const { HttpError, ctrlWrapper } = require('../../helpers');
const { User } = require('../../models/user');

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken }); // перевіряємо чи є в БД користувач з таким токеном верифікації
    
    // Якщо в БД немає користувача з таким токеном верифікації
    if (!user) {
        throw HttpError(404, "User not found");
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "null" });
    
    res.json({
        message: "Verification successful"
    });
}

module.exports = {
    verifyEmail: ctrlWrapper(verifyEmail),
}