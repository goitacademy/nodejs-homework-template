const userDao = require('./users.dao');
const authService = require('../auth/auth.service');
const gravatar = require('gravatar');
const jimp = require('jimp');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const User = require('./user.schema');
const { sendUserVerificationMail } = require('./user.mailer');

const upload = multer({
    dest: path.join(__dirname, 'tmp'),
    limits: {
        fieldSize: 1048576
    }
});

const signUpHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const avatarURL = gravatar.url(req.body.email, { default: 'retro'}, true);
        const createdUser = await userDao.createUser({ email, password, avatarURL });

        await sendUserVerificationMail(createdUser.email, createdUser.verificationToken);
        
        return res.status(201).send({
            user: {
                email: createdUser.email,
                password: createdUser.password,
                avatarURL: createdUser.avatarURL,
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
        const userEntity = await userDao.getUser({ email: req.body.email });

        if (!userEntity || !await userEntity.validatePassword(req.body.password)) {
            return res.status(402).send({message: 'Wrong credentials'})
       };

       if (!userEntity.verify) {
        return res.status(403).send({ message: 'User is not verified' })
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
        const {email, subscription} = req.user;
        return res.status(200).send({user: { email, subscription }});
    } catch (e) {
        return next(e);
    }
};

const changeAvatar = async (req, res, next) => {
    try {
        const avatarImage = await jimp.read(req.file.path);
        const resizedAvatar = avatarImage.resize(250, 250);
        await resizedAvatar.writeAsync(req.file.path);
        await fs.rename(req.file.path, path.join(__dirname, 'public/avatars', Date.now()));
        return res.status(201).send();
    } catch (e) {
        console.error(e); 
        return res.status(500).send();
    }
};

const verifyHandler = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = await userDao.getUser({ verificationToken });

        if (!user) { 
            return res.status(400).send({ message: 'Verification token is not valid or expired' })
        }
        if (user.verify) {
            return res.status(400).send({ message: 'User is already verified' })
        } else (
            await userDao.updateUser(user.email, { verify: true, verificationToken: null })
        )

        return res.status(200).send({ message: 'User has been verified' });
    } catch (e) {
        return next(e);
    }
};

const resendVerificationHandler = async (req, res, next) => {
    try {
        const user = await userDao.getUser({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: 'User does not exist '});
        }
        if (user.verify) {
            return res.status(400).send({ message: 'User is already verified'});
        } else {
            await sendUserVerificationMail(user.email, user.verificationToken);
        }

        return res.status(204).send();
    } catch {
        return next(e);
    }
}

module.exports = {
    signUpHandler,
    loginHandler,
    logoutHandler,
    currentHandler,
    changeAvatar,
    upload,
    verifyHandler,
    resendVerificationHandler,
};