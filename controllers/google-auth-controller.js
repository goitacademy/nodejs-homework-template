import axios from 'axios';
import queryString from 'query-string';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { ctrlWrapper } from "../decorators/index.js";


const { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET } = process.env;

const googleAuth = async (req, res) => {
    const stringifiedParams = queryString.stringify({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: `${BASE_URL}/auth/google-redirect`,
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ].join(" "),
        response_type: "code",
        access_type: "offline",
        prompt: "consent",
    });

    return res.redirect(
        `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
    );
};

const googleRedirect = async (req, res) => {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const urlParams = queryString.parse(urlObj.search);

    const { code } = urlParams;

    const tokenData = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: "post",
        data: {
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            redirect_uri: `${BASE_URL}/auth/google-redirect`,
            grant_type: "authorization_code",
            code,
        },
    });
    
    const userData = await axios({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        method: "get",
        headers: {
            Authorization: `Bearer ${tokenData.data.access_token}`,
        },
    });


    // ----------------------------------------------------------------------

    const { id, name, email, verified_email: verify, picture: avatarURL } = userData.data;
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


export default {
    googleAuth: ctrlWrapper(googleAuth),
    googleRedirect: ctrlWrapper(googleRedirect),
};