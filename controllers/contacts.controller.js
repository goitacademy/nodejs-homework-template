const contactService = require("../service/contacts.service");
const alert = require('alert');

const get = async (req, res, next) => {
    try {
        const { query } = req;
        const results = await contactService.getAll(query);
        res.json({
            status: "success",
            code: 200,
            data: {
                contacts: results,
            },
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await contactService.getOne(id);
        if(!results) {
            res.status(404).json({
                status: "not-found",
                code: 404,
                data: {
                    contact: results,
                },
            });    
            return;
        }
        res.json({
            status: "success",
            code: 200,
            data: {
                contact: results,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            code: 400,
            data: {
                message: err.message,
            },
        });
    }
};

const create = async (req, res, next) => {
    try {
        const { body } = req;
        const results = await contactService.create(body);
        res.json({
            status: "success",
            code: 200,
            data: {
                contact: results,
            },
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const results = await contactService.update(id, body);
        res.json({
            status: "success",
            code: 200,
            data: {
                contact: results,
            },
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const updateFavorite = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { favorite } = req.body;
        const results = await contactService.updateFavorite(id, favorite);
        res.json({
            status: "success",
            code: 200,
            data: {
                contact: results,
            },
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await contactService.remove(id);
        if(results) {
            alert("Contact has been deleted")
        }
        res.json({
            status: "success",
            code: 200,
                data: {
                    contact: results,
                },
            })
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    get,
    getById,
    create,
    update,
    updateFavorite,
    remove,
};