const userDao = require('./users.dao');
const authService = require('../auth/auth.service');

const signUpHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const createdUser = await userDao.createUser({ email, password });

        return res.status(201).send({
            user: {
                email: createdUser.email,
                password: createdUser.password,
            }
        });
    } catch (e) {
         const {message} = e;
         if (e instanceof userDao.DuplicatedKeyError) {
            return res.status(409).send({message});
         }
         return next(e);
    }
};

const loginHandler = async (req, res, next) => {
    try {
        const userEntity = await userDao.getUser(req.body.email);

        if (!userEntity || !await userEntity.validatePassword(req.body.password)) {
            return res.status(402).send({message: 'Wrong credentials'})
       };

        const userPayload = {
            email: userEntity.email,
            password: userEntity.password,
        };

        const token = authService.generateAccessToken(userPayload);
        await userDao.updateUser(userEntity.email, { token });

        return res.status(200).send({
        email: userPayload,
        token,
        });
    } catch (e) {
        return next(e);
    }
};

const logoutHandler = async (req, res, next) => {
    try {
    const { email } = req.user;
    await userDao.updateUser(email, { token: null });

    return res.status(204).send();
    } catch (e) {
        return next(e);
    }
};

const currentHandler = async (req, res, next) => {
    try {
        const {email, role} = req.user;
        return res.status(200).send({user: { email, role }});
    } catch (e) {
        return next(e);
    }
};

module.exports = {
    signUpHandler,
    loginHandler,
    logoutHandler,
    currentHandler,
};