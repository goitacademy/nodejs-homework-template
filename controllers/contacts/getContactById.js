const { Contact } = require('../../models')

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId)
    if (!result) {
        res.status(404).json({
            status: "error",
            code: 404,
            mesage: `Contact with id= ${contactId} not found`
        })
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

module.exports = getContactById;