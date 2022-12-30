const { Contact } = require("../models");
require("dotenv").config();
    const getAll = async (req, res) => {
        const data = await Contact.find({});
        res.json({data});
};
    const getById = async (req, res) => {
        const { contactId } = req.params;
        const data = await Contact.findById(contactId);

        if (!data) {
            return res.status(404).json({
            status: "error",
            code: 404,
            message: "Not found",
            });
        }

        res.json({
            status: "success",
            code: 200,
            data,
        });
};

    const addById = async (req, res) => {
    const data = await Contact.create(req.body);
    res.status(201).json({
        status: "success",
        code: 201,
        data,
    });
};
    const deleteById = async (req, res) => {
        const { contactId } = req.params;
        const data = await Contact.findByIdAndDelete(contactId);

        if (!data) {
            return res.status(404).json({
            status: "error",
            code: 404,
            message: "Not found",
            });
        }

        res.json({
            status: "success",
            code: 200,
            message: "contact deleted",
            data,
        });
};
        const updateById = async (req, res) => {
            const { contactId } = req.params;
            const data = await Contact.findByIdAndUpdate(contactId, req.body, {
                new: true,
            });

            if (!data) {
                return res.status(404).json({
                status: "error",
                code: 404,
                message: "Not found",
                });
            }

            if (!req.body) {
                return res.status(400).json({
                status: "error",
                code: 400,
                message: "missing fields",
                });
            }

            res.json({
                status: "success",
                code: 200,
                data,
            });
        };
        const updateFavorite = async (req, res) => {
            const { contactId } = req.params;
            const { favorite } = req.body;

            const data = await Contact.findByIdAndUpdate(
                contactId,
                { favorite },
                { new: true }
            );

            if (!data) {
                return res.status(404).json({
                status: "error",
                code: 404,
                message: "Not found",
                });
            }

            if (!req.body) {
                return res.status(400).json({
                status: "error",
                code: 400,
                message: "missing field favorite",
                });
            }

            res.json({
                status: "success",
                code: 200,
                data,
            });
};

module.exports = {
  getAll,
  getById,
  addById,
  deleteById,
    updateById,
  updateFavorite,
};