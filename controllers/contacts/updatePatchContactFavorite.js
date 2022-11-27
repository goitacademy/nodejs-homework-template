//? +++++++++++++++++++  mongoose +++++++++++++++++++
const { NotFound, BadRequest } = require('http-errors');
const { Contact } = require("../../models");


//-----------------------------------------------------------------------------
const updatePatchContactFavorite = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body

    //! Проверка условия "Если body нет" 
    if (!(favorite === false || favorite === true)) {
        throw new BadRequest("missing field favorite")
    }

    const contact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

    if (!contact) {
        throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }

    res.status(200).json({
        status: "success",
        code: 200,
        data: { contact }
    })
};

module.exports = updatePatchContactFavorite;
//? _____________________  mongoose _____________________




