const handleUserRouter = (error, res) => {
    if (error) {
        return res.status(400).json({ err: error.details.map(err => err.message) })
    }
}

module.exports = handleUserRouter