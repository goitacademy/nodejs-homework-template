const service = require("../service/index")

const updateContact = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;

        if (!name && !email && !phone) {
            res.status(400).json({ "message": "missing fields" });
            return;
        }
        const data = await service.updateContact(req.params.contactId, req.body)
        if (!data) {
            res.status(404).json({ "message": "Not found" })
            return
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

module.exports = updateContact;