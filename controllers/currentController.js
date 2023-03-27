
const CurrentConrtoller = async (req, res, next) => {
    const contact = req.user
    contact.password = undefined
    contact.token = undefined
    res.status(200).json({
        contact 
    })
}

module.exports = CurrentConrtoller