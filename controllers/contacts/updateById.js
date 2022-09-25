const { Contact } = require("../../models");
const {RequestError} = require("../../helpers");

const updateById = async(req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
         throw RequestError(404, `User with ${contactId} not found !`);
    };
     res.json({
        status: "success",
        code: 200,
        data: result
    })
};

module.exports = updateById;

