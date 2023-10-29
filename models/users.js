const User = require('../models/schemas/users')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} email Електронна адреса користувача для перевірки конфлікту.
 * @param {*} password Пароль користувача для зберігання в базі даних.
 * @returns {Object} Об'єкт відповіді зі статусом та повідомленням: 
 * - Якщо в body є поле email з існуючим, повертає json з ключем {"message": "Email in use"} і статусом 409 Conflict.
 * - якщо в body немає поля email з існуючим, повертає об'єкт з ключами {password, email} і статусом 201
 */
const createUser = async ({ name, email, password, subscription }) => {
    const user = await User({ name, email, password, subscription })
    return await user.save()
}

/**
 * Отримує користувача за email.
 * @param {*} email користувача
 * @returns {Promise<Object|null>} - Об'єкт користувача з властивостями email, subscription та token.
 * Якщо користувача не знайдено, повертає помилку 401 з повідомленням "message": "Email or password is wrong"
 */
const getUserByEmail = async (email) => {
    return await User.findOne({ email });
}

/**
 * Знаходить користувача за id
 * @param {*} id - Ідентифікатор користувача
 * @returns {Promise} - Об'єкт користувача або null, якщо користувача не знайдено.
 */
const findById = async id => {
    return await User.findOne({ _id: id });
};

/**
 * Оновлює токен доступу користувача
 * @param {*} _id 
 * @param {*} token - новий токен доступу
 * @returns {Promise} - Об'єкт з результатом оновлення або помилкою, якщо оновлення не вдалося.
 */
const updateToken = async (_id, token) => {
    return await User.updateOne(_id, { token });
};

/**
 * 
 * @param {string} _id 
 * @param {Object} subscription - підписка користувача
 * @returns {Promise<User>} - Об'єкт з результатом оновлення підписки
 */
const updateSubscription = async (_id, subscription) => {
    return await User.findByIdAndUpdate(_id, subscription, {
        new: true,
    });
}

/**
 * 
 * @param {string} _id 
 * @param {string} avatarURL - URL аватарки
 * @returns {Promise<User>} - Оновлення аватарки
 */
const updateAvatar = async (_id, avatarURL) => {
    return await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
}

/**
 * 
 * @param {string} verificationToken 
 * @returns генерує verificationToken
 */
const findByVerifyToken = async verificationToken => {
    return await User.findOne({ verificationToken })
}

// const updateVerifyToken = async (email, verify, verificationToken) => {/* _id */
//     return await User.findByIdAndUpdate(email, { verify, verificationToken })
// }

module.exports = {
    createUser,
    getUserByEmail,
    findById,
    updateToken,
    updateSubscription,
    updateAvatar,
    findByVerifyToken,
    // updateVerifyToken
}