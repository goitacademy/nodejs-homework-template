### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

## NodeJS --- Passport Google Oauth20

# app.js:

import session from 'express-session';
import passport from 'passport';
import './passport-config/passport-config.js'

// Конфігурація сесій та Passport
const { GOOGLE_CLIENT_SECRET } = process.env;

app.use(session({ secret: GOOGLE_CLIENT_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

# google-auth-controller.js:

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const { BASE_URL, JWT_SECRET } = process.env;

const loginSuccess = async (req, res) => {

    const { id, displayName: name, emails, photos } = req.user;

    const email = emails[0].value;
    const verify = emails[0].verified;
    const avatarURL = photos[0].value
    const password = await bcrypt.hash(id, 10);
    const verificationToken = 'null';

    const user = await User.findOne({ email });

    if (user) {
        const passwordCompare = await bcrypt.compare(id, user.password);

        if (passwordCompare) {
            const { _id: id } = user;
            const payload = { id };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });
            const updateUser = await User.findByIdAndUpdate(id, { token });

            return res.redirect(
                `${BASE_URL}?token=${updateUser.token}&email=${updateUser.email}&subscription=${updateUser.subscription}`
            );
        };
    } else {
        const newUser = await User.create({ name, email, password, verify, avatarURL, verificationToken });

        const { _id: id } = newUser;
        const payload = { id };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });
        const updateUser = await User.findByIdAndUpdate(id, { token });

        return res.redirect(
            `${BASE_URL}?token=${updateUser.token}&email=${updateUser.email}&subscription=${updateUser.subscription}`
        );
    };

};

const loginFailure = async (req, res) => {
res.send('Аутентифікація не вдалася. Спробуйте ще раз.');
};

export default {
loginSuccess,
loginFailure,
};

# google-auth-router.js:

import express from "express";
import passport from 'passport';

import passportGoogleOauth20Controller from "../../controllers/passport-google-oauth20-controller.js";

const googleAuthRouter = express.Router();

// Реєстрація маршрутів для Google Auth
googleAuthRouter.get('/google',
passport.authenticate('google', { scope: ['profile', 'email'] })
);

googleAuthRouter.get('/callback',
passport.authenticate('google', { failureRedirect: '/auth/failure' }),
passportGoogleOauth20Controller.loginSuccess
);

googleAuthRouter.get('/failure', passportGoogleOauth20Controller.loginFailure);

export default googleAuthRouter;

# passport-config.js:

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.serializeUser((user, done) => {
done(null, user);
});

passport.deserializeUser((obj, done) => {
done(null, obj);
});

passport.use(new GoogleStrategy({
clientID: GOOGLE_CLIENT_ID,
clientSecret: GOOGLE_CLIENT_SECRET,
callbackURL: `${BASE_URL}/auth/callback`,
},
(accessToken, refreshToken, profile, done) => {
return done(null, profile);
}
));

#
