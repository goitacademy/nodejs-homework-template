const  updateById  = require("./updateById");

const updateStatusContact = async(req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await updateById(contactId, { favorite });
    
    if (!result) {
        const error = new Error("Not found");
            error.status = 404;
            res.status(404).json({
            message: `Product with id=${contactId} not found`
        });
        return;
    };
     res.json({
        status: "success",
        code: 200,
        data: result
    })
};

module.exports = updateStatusContact;






// const { Contact } = require("../../models");

// const updateStatusContact = async(req, res) => {
//     const { contactId } = req.params;
//     const { favorite } = req.body;
//     const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
    
//     if (!result) {
//         const error = new Error("Not found");
//             error.status = 404;
//             res.status(404).json({
//             message: `Product with id=${contactId} not found`
//         });
//         return;
//     };
//      res.json({
//         status: "success",
//         code: 200,
//         data: result
//     })
// };

// module.exports = updateStatusContact;