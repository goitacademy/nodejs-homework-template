import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../schemas/user.js";
import { HttpError } from "../../helpers/HttpErrors.js";
import { ctrlWrapper } from "../../helpers/ctrlWraper.js";
const { SECRET_KEY } = process.env;

const logIn = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, {token});

    res.status(200).json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
            _id: user.id,
        },
    });
};

export const login = ctrlWrapper(logIn);