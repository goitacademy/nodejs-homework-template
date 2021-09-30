const { Contact, contactSchema } = require("../../models");

const updateActive = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { favorite } = req.body;

         if (favorite === undefined) {
      return res.status(400).json({
        message: 'missing field favorite',
      })
    }
        const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new:true,});
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
            data: {
                result
            }
        })
    } catch (error) {
        next(error)
    }
};


module.exports = updateActive;