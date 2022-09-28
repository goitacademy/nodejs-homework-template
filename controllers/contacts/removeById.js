const {Contact} = require("../../models");
const { RequestError } = require("../../helpers");

const removeById = async(req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    
    if (!result) {
      throw RequestError(404, `User with ${contactId} not found !`);
    };
        res.json({
        status: "success",
        code: 200,
        message: "product deleted",
        data: result
    })
};

module.exports = removeById;

