const service = require("../service/index")

const getContactById = async (req, res, next) => {
    try {
        const data = await service.getContactById(req.params.contactId)
        if (!data) {
            res.status(404).json({ "message": "Not found" })
            return
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

module.exports = getContactById;