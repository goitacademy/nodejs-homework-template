const jwt = require('jsonwebtoken');

const autchMiddleware = (req, res, next) => {
    const [typeToken,token] = req.headers['authorization'].split(" ");
    if (!token) {
        return res.status(401).json({message: "Not authorized"})
    }

    try {
        const user = jwt.decode(token, process.env.JWT_SECRET)
        req.user = user;
        req.token = token;
        next()
    } catch (err) {
        res.status(401).json({ message: "Not authorized" })
        next()
    }
}

module.exports = {
    autchMiddleware
}
