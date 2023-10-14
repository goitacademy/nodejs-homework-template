const userDao = require('./users.dao');

const signUpHandler = async (req, res) => {
    const { email, password } = req.body;
    const createdUser = await userDao.createUser({ email, password });

    return res.status(201).send({
        user: {
                email: createdUser.email,
                password: createdUser.password,
        }
    });
};

module.exports = {
    signUpHandler,
}