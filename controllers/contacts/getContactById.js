const ContactModel = require("../../models/contact")

const getContactById = async (req, res) => {
    const { id } = req.params
    const result = await ContactModel.findById(id)

    if (!result) {
        res.status(404).json({ message: `Not found contact with id:${id}` })
    }
    
    res.json(result)
}

module.exports = getContactById