const handleUserRouter = (res, validDataUser, error) => {
    if (validDataUser.error) {
        return res.status(400).json({ err: validDataUser.details.map(err => err.message) })
    }
}

module.exports = handleUserRouter