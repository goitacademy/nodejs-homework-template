const service = require("../service/index")

const deleteContact = async (req, res, next) => {
    try {
        const data = await service.removeContact(req.params.contactId);
        if (!data) {
            res.status(404).json({ "message": "Not found" })
            return
        }
        res.status(200).json({ "message": "contact deleted" })
    } catch (error) {
        next(error)
    }
}

module.exports = deleteContact;