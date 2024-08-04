const express = require("express");
const router = express.Router();
const getUserModel = require("../../models/users/user"); 
const jwt = require("jsonwebtoken");
const {
    signupSchema,
    loginSchema,
    patchUserSchema,
} = require("../../validation.js");

const authMiddleware = require("../../middlewares/jwt.js");
const gravatar = require("gravatar");

const fs = require("fs").promises;
const path = require("path");
const { v4: uuidV4 } = require("uuid");

const { sendVerificationEmail } = require("../../controllers/email/email.js");

const {
    isImageAndTransform,
    storeImageDir,
    uploadMiddleware,
} = require("../../controllers/fileController/fileController.js");

router.post("/verify", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res
            .status(400)
            .json({ message: "Missing required field email" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verify) {
            return res
                .status(400)
                .json({ message: "Verification has already been passed" });
        }

        await sendVerificationEmail(email, user.verificationToken, req);

        return res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
        console.error("Error resending verification email:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/verify/:verificationToken", async (req, res) => {
    const { verificationToken } = req.params;

    try {
        const user = await User.findOne({ verificationToken });

        if (!user) {
            return res.status(404).json({ message: "Not Found" });
        }

        if (verificationToken) {
            user.verificationToken = null;
            user.verify = true;
            await user.save();

            return res.status(200).json({ message: "Successful response" });
        } else {
            return res
                .status(400)
                .json({ message: "Invalid verification token" });
        }
    } catch (error) {
        console.error("Error verifying email:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/signup", async (req, res, next) => {
    const { error } = signupSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res
                .status(409)
                .json({ message: `${email} is already taken.` });
        }

        const avatarURL = gravatar.url(email, { s: "200", d: "retro" });
        const verificationToken = uuidV4().replace(/-/g, "").substring(0, 20);

        const newUser = new User({ email, avatarURL, verificationToken });
        await newUser.setPassword(password);
        await newUser.save();

        await sendVerificationEmail(email, verificationToken, req);

        res.status(201).json({
            message: `${email} - User Created. Verification email sent.`,
        });
    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res) => {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(401)
                .json({ message: "Email or password is wrong." });
        }

        const passwordMatches = await user.validatePassword(password);

        if (passwordMatches) {
            const payload = {
                id: user._id,
                email: user.email,
                subscription: user.subscription,
            };
            const token = jwt.sign(payload, process.env.SECRET, {
                expiresIn: "12h",
            });

            user.token = token;
            await user.save();

            return res.status(200).json({
                token,
                user: {
                    email: user.email,
                    subscription: user.subscription,
                },
            });
        } else {
            return res
                .status(401)
                .json({ message: "Email or password is wrong." });
        }
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: "Internal Server Error." });
    }
});

router.get("/logout", authMiddleware, async (req, res) => {
    try {
        const userId = res.locals.user._id;
        const user = await User.findById(userId);

        user.token = null;
        await user.save();

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("Error logging out:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/current", authMiddleware, async (req, res) => {
    try {
        const currentUser = res.locals.user;

        return res.status(200).json({
            email: currentUser.email,
            subscription: currentUser.subscription,
        });
    } catch (err) {
        console.error("Error getting current user:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.patch(
    "/avatars",
    authMiddleware,
    uploadMiddleware.single("avatar"),
    async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: "File is not a photo." });
        }

        const { path: temporaryPath, filename } = req.file;
        const filePath = path.join(storeImageDir, filename);

        try {
            await isImageAndTransform(temporaryPath);

            await fs.rename(temporaryPath, filePath);

            const userId = res.locals.user._id;
            const user = await User.findByIdAndUpdate(
                userId,
                { avatarURL: `/avatars/${filename}` },
                { new: true }
            );

            res.status(200).json({
                message: "Avatar uploaded and URL saved successfully.",
                user: {
                    email: user.email,
                    avatarURL: user.avatarURL,
                },
            });
        } catch (error) {
            console.error("Error processing avatar:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
);
router.patch("/:userId", authMiddleware, async (req, res) => {
    try {
        const { subscription } = req.body;
        const { userId } = req.params;

        const { error } = patchUserSchema.validate({ userId, subscription });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        if (!["starter", "pro", "business"].includes(subscription)) {
            return res
                .status(400)
                .json({ message: "Invalid subscription value." });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { subscription },
            { new: true }
        );

        return res.status(200).json({
            message: "Subscription updated successfully.",
            user: updatedUser,
        });
    } catch (err) {
        console.error("Error updating subscription:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;