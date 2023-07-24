const { HttpError, ctrlWrapper } = require('../../helpers');

// Перевірка валідності токена
const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription,
    });
}

module.exports = {
    getCurrent: ctrlWrapper(getCurrent),
}