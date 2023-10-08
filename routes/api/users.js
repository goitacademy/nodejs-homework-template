const express = require('express')
const router = express.Router()
// const { postUser, getUserById } = require('../../controllers/user')
const { postUser } = require('../../controllers/user')

const { userSchema } = require('../../routes/api/validation-user')
const User = require('../../models/schemas/users')
const createTokenUser = require('../../helpers/createTokenUser')

/**
 * @ GET /users/register/registration
 * Отримує body
 * Викликає функцію postUser
 */
router.post('/registration', postUser)

// router.get('/', getUserById)
router.post('/find', async (req, res) => {
    try {
        const { email, password } = req.body; // Отримання email і password з параметрів запиту (query parameters)

        // Валідація вхідних даних
        const validDataUser = userSchema.validate({ email, password });
        if (validDataUser.error) {
            return res.status(400).json({ err: validDataUser.error.details.map(err => err.message) });
        }

        // Пошук користувача за email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Email or password is wrong' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Email or password is wrong' });
        }

        const passwordMatch = await user.comparePasswords(password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Email or password is wrong' });
        }

        // Генерація токену (якщо потрібно)
        const token = createTokenUser(user.email, user._id);

        // Відправка успішної відповіді з токеном та даними користувача
        return res.status(200).json({ user, token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router