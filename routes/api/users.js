const express = require("express");

const { User } = require("../../models");
const { authenticate } = require("../../middlewares")


const router = express.Router();

router.get("/logout", authenticate, async (req, res, next) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).send();
});


router.get("/current", authenticate, async (req, res, next) => {
    const { name, subscription } = req.user;
    res.json({
        user: {
            name,
            subscription
        }
    })
});

router.patch("/", authenticate, async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { subscription } = req.body;
        const updatrContact = await User.findByIdAndUpdate(
            _id,
            { subscription },
            {
                new: true,
            }
        );
        res.json(updatrContact);
    } catch (error) {
        next(error);
    }
});

module.exports = router;