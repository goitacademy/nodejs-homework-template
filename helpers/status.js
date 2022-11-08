const status = (res, number, type, object) => {
    return res.status(number).json({ type, object });
}

module.exports = {
    status
}