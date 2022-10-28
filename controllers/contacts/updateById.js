const {RequestError} = require("../../helpers")
const contacts = require("../../models/contacts")

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.updateById(id, req.body);
    if (!result) {
      throw RequestError(404, "Not found")
    }
    res.json(result)
}

module.exports = updateById;