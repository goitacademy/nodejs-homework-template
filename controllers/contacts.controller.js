const contactService = require("../service/contacts.service");
const alert = require('alert');

const get = async (req, res, next) => {
    try {
        const { query, user } = req;
        const results = await contactService.getAll({ ...query, owner: user._id});
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
        const { params, user } = req;
        const { id } = params;
        const results = await contactService.getOne(id, user._id);
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
        const { body, user } = req;
        const results = await contactService.create({ ...body, owner: user._id });
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
        const { body, user } = req;
        const results = await contactService.update(id, user._id, body);
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
       const { body, params, user } = req;
        const { id } = params;
        const { favorite } = body;
        const results = await contactService.updateFavorite(id, user._id, favorite);
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
        const { user } = req;
        const results = await contactService.remove(id, user._id);
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