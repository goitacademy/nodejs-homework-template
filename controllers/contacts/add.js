const { BadRequest } = require("http-errors");

const contactsOperations = require("../../models/contacts");

const add = async (req, res) => {
    const result = await contactsOperations.addContact(req.body);
    
    if (!result) {
        throw new BadRequest(`missing required name field`);        
    }

    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            result
        }
    })
}

module.exports = add;