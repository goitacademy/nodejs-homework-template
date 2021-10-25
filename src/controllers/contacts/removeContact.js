const {Contact} = require("../../models");
const HTTP_CODS = require("../../helpers/httpCodes")

const removeContact =   async (req, res, next) => {
    try {
        const { contactId } = req.params;
const deleteContact = await Contact.findByIdAndDelete(contactId);
if (!deleteContact) { 
    res
                .status(HTTP_CODS.BAD_REQUEST)
                .json({
                "message": "Not found"
            })
}
res
.status(HTTP_CODS.OK)
.json({ message: "contact deleted", deleteContact })
} catch (error) {
next(error)
}
}
module.exports = removeContact;