const { Contact } = require("../../models");


const removeById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndDelete(contactId);
        console.log(result)
        if (!result) {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Conatct with ID=${contactId} not found`,
            })
            return
        }
        res.json({
            status: "success",
            code: 200,
            message: "Success delete"
        })
    }
    catch (error) {
        next(error);
    }
};

module.exports = removeById