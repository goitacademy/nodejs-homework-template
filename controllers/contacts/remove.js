const RequestError = require('../../helpers/RequestError');
const Contact = require('../../models/contact');

const remove = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findOneAndDelete({ _id: contactId });
    console.log(contactId);
    if (!result) {
        throw RequestError(404, 'Not found');
    }
    res.json({
        message: "contact deleted"
    });
}

module.exports = remove;