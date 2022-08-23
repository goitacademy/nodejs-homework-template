const { Contact } = require("../models/contacts");
const { RequestErr } = require("../helpers/RequestErr");

const updateFavorite = async (req, res, next) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result) {
        throw RequestErr(404, "Not found");
    }
    res.json(result);
}

module.exports = updateFavorite;