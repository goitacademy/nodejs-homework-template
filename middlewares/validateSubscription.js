const validateSubscription = (req, res, next) => {
    if (!req.body || !req.body.subscription) {
        return res.status(400).json({ message: "missing field subscription" })
    }
    next()
}

module.exports = validateSubscription
