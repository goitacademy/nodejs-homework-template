const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const create = async (req, res, next) => {
	const result = await Contact.create(req.body);
	res.status(201).json(result);
};

module.exports = ctrlWrapper(create);
