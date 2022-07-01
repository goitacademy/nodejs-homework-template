const {Contact} = require("../../models/contact")

const updateFavourite = async (req, res) => {
    const {id} = req.params
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

module.exports = updateFavourite