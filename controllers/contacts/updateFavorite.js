const Contact = require("../../models/contact")

const HttpError = require("../../helpers")

const updateFavorite = async(req, res)=> {
    const {id} = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
    if(!result) {
        throw HttpError(404, "Not found")
    }

    res.json(result)
}

module.exports = updateFavorite