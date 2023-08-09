import "dotenv/config";
import bcrypt from 'bcrypt';
import gravatar from 'gravatar';
import User from '../../models/user.js';
import { HttpError, createVerifyEmail, sendEmail } from '../../helpers/index.js';
import { nanoid } from "nanoid";

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

    const verifyEmail = createVerifyEmail({ email, verificationToken });

    await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: "starter",
        },
    })
};

export default register;