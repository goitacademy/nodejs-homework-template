const express = require("express");
const { User, schemas } = require("../../models/user");
const bcrypt = require("bcrypt");
const { RequestError, ctrlWrapper } = require("../../helpers");
const { validateBody, auth } = require("../../middlewares");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const router = express.Router();

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

async function register(req, res) {
    const { password, email, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) throw RequestError(409, "Email in use");
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
        password: hashPassword,
        email,
        subscription,
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

    res.status(201).json({
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

module.exports = router;
