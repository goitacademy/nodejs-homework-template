const Contact = require("../../models/contacts");
const { HttpError } = require("../../helpers");

 const updateFieldFavorite = async (req, res, next) => {
     const { id } = req.params;
     const { favorite } = req.body;
     console.log(favorite)
     const result = await Contact.findByIdAndUpdate(id, { favorite }, { new: true });
  
    if (!result) {
      throw HttpError(404, `Not found contact with id:${id}`)
    }
    res.json(result)

 }

 module.exports = updateFieldFavorite