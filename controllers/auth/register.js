const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { randomUUID } = require("crypto");

const {User} = require("../../models/user");

const { HttpError, ctrlWrapper, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const register = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email,
        { s: "250", r: "g", d: "wavatar" },
        false
        );
    
    const verificationToken = randomUUID();

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken });

    const verifyEmail = {
        to: email,
        subject: "Verify your email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">
        Click here to verify your email.
        </a>`,
    };
    await sendEmail(verifyEmail);

    res.status(201).json({
        user:{
            email: newUser.email,
            name: newUser.name,
        }
    });
};

module.exports = { register: ctrlWrapper(register) };