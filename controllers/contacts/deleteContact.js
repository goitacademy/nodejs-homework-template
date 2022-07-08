const {Contact} = require("../../models/contact")

const deleteContact = async (req, res) => {
    const {id} = req.params
    await Contact.findByIdAndDelete(id)
    res.json({
        message: "contact deleted",
    })

}

module.exports = deleteContact