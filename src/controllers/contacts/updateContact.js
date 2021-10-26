
   
const { Contact } = require("../../models");
const HTTP_CODS = require("../../helpers/httpCodes");

const updateContact = async (req, res, next) => {
    try {
        const { contactId } = req.params 
        const update = await Contact.findByIdAndUpdate(
            contactId,
            req.body,
            { new: true }
        )               
    if (!update) {
        return res
                .status(HTTP_CODS.BAD_REQUEST)
                .json({
                    message: 'Not found',
                })
        }
        res
            .status(HTTP_CODS.OK)
            .json({ update})
    } catch (error) {
        next(error)
    } 
}

module.exports = updateContact;