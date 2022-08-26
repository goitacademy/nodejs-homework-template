const { Contact } = require("../models/contacts");
const { RequestErr } = require("../helpers");

const updateFavorite = async (req, res, _) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result) {
        throw RequestErr(404, "Not found");
    }
    res.json(result);
}

module.exports = updateFavorite;