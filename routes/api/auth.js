const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const { User, schemas } = require("../../models/user");
const { RequestError, ctrlWrapper } = require("../../helpers");
const { validateBody, auth, upload } = require("../../middlewares");
const { SECRET_KEY } = process.env;

const router = express.Router();

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

router.post("/signup", validateBody(schemas.signup), ctrlWrapper(register));

router.post("/signin", validateBody(schemas.signin), ctrlWrapper(login));

router.get("/current", auth, ctrlWrapper(getCurrent));

router.get("/logout", auth, ctrlWrapper(logout));

router.patch(
    "/",
    auth,
    validateBody(schemas.subscription),
    ctrlWrapper(setSubscription)
);

router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(setAvatar));

async function register(req, res) {
    const { password, email, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) throw RequestError(409, "Email in use");
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const result = await User.create({
        password: hashPassword,
        email,
        subscription,
        avatarURL,
    });
    res.status(201).json({
        email: result.email,
        subscription: result.subscription,
    });
}

async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw RequestError(401, "Email or password is wrong");
    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) throw RequestError(401, "Email or password is wrong");
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        token,
        user: { email: user.email, subscription: user.subscription },
    });
}

async function getCurrent(req, res) {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
}

async function logout(req, res) {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json({ message: "Logout success" });
}

async function setSubscription(req, res) {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if (!result) throw RequestError(404, "Not found");

    res.status(200).json(result);
}

async function setAvatar(req, res) {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const avatar = await Jimp.read(tempUpload);
    await avatar.resize(250, 250).writeAsync(tempUpload);

    const extension = originalname.split(".").pop();
    const filename = `${_id}.${extension}`;

    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);

    const result = await User.findByIdAndUpdate(_id, { avatarURL });
    if (!result) throw RequestError(404, "Not found");

    res.status(200).json({ avatarURL });
}

module.exports = router;
