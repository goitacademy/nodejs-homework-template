const { Contact } = require("../models/contact");

const getAll = async (req, res) => {
    const result = await Contact.find({});
    res.json({
        status: "succes",
        code: 200,
        data: {
            result
        }
    })
}

const add = async (req, res) => { 
    const result = await Contact.create(req.body)
    res.status(201).json({
        status: "succcess",
        code: 201,
        data: {
            result
        }
    })
}

module.exports = getAll;

