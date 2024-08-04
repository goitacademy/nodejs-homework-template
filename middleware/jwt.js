const passport = require("passport");

async function authMiddleware(req, res, next) {
    try {
        passport.authenticate(
            "jwt",
            {
                session: false,
            },
            (err, user) => {
                if (!user || err) {
                    return res.status(401).json({ message: "Not authorized" });
                }
                if (!user.token) {
                    return res
                        .status(401)
                        .json({ message: "Token expired or invalidated" });
                }
                if (!user._id) {
                    return res.status(401).json({ message: "User not found." });
                }
                res.locals.user = user;
                req.user = user;

                next();
            }
        )(req, res, next);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = authMiddleware;