const service = require("../service/index")

const updateContactByStatus = async (req, res, next) => {
    try {
        const { favorite } = req.body;
        if (typeof favorite !== 'boolean') {
            res.status(400).json({ "message": "only value of favorite!" });
            return;
        }
        const data = await service.updateStatusContact(req.params.contactId, req.body)
        if (!data) {
            res.status(404).json({ "message": "Not found" })
            return
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

module.exports = updateContactByStatus;