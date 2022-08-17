// за параметром verificationToken шукаємо користувача у моделі User
// якщо користувача з таким токеном не знайдено, необхідно повернути відповідь зі статусом 404
// якщо користувач знайдено - встановлюємо verificationToken у null, 
// а поле verify ставимо рівним true у документі користувача та повертаємо відповідь зі статусом 200


const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const verifyEmail = async(req, res) => {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw createError(404, 'User not found');
    }

    // якщо є такий користувач оновлюєм запис
    await User.findByIdAndUpdate(user._id, { verificationToken: null, verify: true });

    return res.json({
        status: 'Success',
        code: 200,
        message: 'Verification successful',
    });
};

module.exports = verifyEmail;