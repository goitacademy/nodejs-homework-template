    const { Contact } = require("../../models");
const HTTP_CODS = require("../../helpers/httpCodes")

const getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const contact = await Contact.findById(contactId)
        if (contact) {
            return res
            .status(HTTP_CODS.OK)
            .json({ contact });
        }
        return res
            .status(HTTP_CODS.BAD_REQUEST)
            .json({ message: 'Not found' });
    } catch (error) {
        next(error)
    }
}
module.exports = getContactById;