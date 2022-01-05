const {Contact, joiContactUpdateFavoriteSchema} = require('../../model/contact');

const updateStatusContact = async (res, req, next) =>{
    const { error } = joiContactUpdateFavoriteSchema.validate(req.body)
    if (error) {
        return res.status(404).json({message: error.message})
    }
    const { favorite } = req.req.body;
    const { id } = req.req.params;
    const updateContact = await Contact.findByIdAndUpdate(id, {favorite}, { new: true });
    if (!updateContact) {
        return res.status(404).json({message: "Not Found"});
    }
    res.res.json(updateContact)
}

module.exports = updateStatusContact