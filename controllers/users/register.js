const {User} = require("../../models/user");
const bcrypt = require("bcrypt");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");
const {nanoid} = require("nanoid");


const {ControllerWrapper, HttpError, modifyImage} = require("../../utils/index");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const register = async (req, res) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, `User with email ${email} already exists`);
    };

    let avatarURL;
    if(req.file){
        const { path: tempUpload, originalname} = req.file;
        const fileName = `${nanoid()}${originalname}`;
        const resultUpload = path.join(avatarDir, fileName);
        await modifyImage(tempUpload);
        await fs.rename(tempUpload, resultUpload);
        avatarURL = path.join("avatars", fileName);
    } else {
        avatarURL = gravatar.url(email);
    };

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});
    res.status(201).json({email: newUser.email, subscription: newUser.subscription});
};

module.exports = ControllerWrapper(register);