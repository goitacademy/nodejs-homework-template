const { Contact } = require("../models/contacts");
const { NotFound } = require("http-errors");

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

const getById =  async (req, res) => {
        const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
        throw new NotFound("Not found");
    }
    res.json({
            status: "success",
            code: 200,
            data: {
                result: contact,
            },
        });
    } 

const updateById = async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!contact) {
        throw new NotFound("Not found");
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result: contact,
        },
    });
} 

const deleteById = async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id,  { new: true });
    if (!contact) {
        throw new NotFound("Not found");
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result: contact,
        },
    });
} 

const updateFavorite = async (req, res) => {
    const { ContactId } = req.params;
    const contact = await Contact.findByIdAndRemove( ContactId, req.body, { new: true });
    if (!contact) {
        throw new NotFound("Not found");
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result: contact,
        },
    });
} 


module.exports = {
    getAll,
    getById,
    add,
    deleteById,
    updateById,
    updateFavorite
};