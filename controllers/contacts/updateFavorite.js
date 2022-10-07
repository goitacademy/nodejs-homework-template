const { Contact } = require("../../models");
const {RequestError} = require("../../helpers")

const updateFavorite = async (req, res, next) => {
    const { id } = req.params;
    if (!req.body) {
        throw RequestError(400,"missing field favorite" )
    }
    const result = await Contact.findByIdAndUpdate(id, req.body,"-createdAt  -updatedAt",{new:true});
    if (!result) {
        throw RequestError(404, 'Not found')
    }
    res.json(result)
  
};

module.exports = updateFavorite;