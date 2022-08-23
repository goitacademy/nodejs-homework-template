const { Contact } = require("../models/contacts");
const { RequestErr } = require("../helpers/RequestErr");

const getContactById = async(req, res) => {
    const {id} = req.params;
    const result = await Contact.findById(id);
    // const result = await Book.findOne({_id: id})
    if(!result) {
        throw RequestErr(404, "Not found");
    }
    res.json(result);
}

  module.exports = getContactById;