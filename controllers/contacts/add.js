const {Contact} = require("../../models/contactModel")

const add = async (req, res, next) => {

    const result = await Contact.create(req.body)
    // const result = await Contact.save(req.body)
    res.status(201).json(result)

}

module.exports = add 