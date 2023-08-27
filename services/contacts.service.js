const Contact = require("../models/contact.model");

const getAll = async () => {
	return Contact.find();
};

const getOne = async (id) => {
	return Contact.findOne({ _id: id });
};

const create = async (data) => {
	return Contact.create(data);
};

const update = async (id, data) => {
	return Contact.findByIdAndUpdate({ _id: id }, data);
};

const updateStatus = async (id, favorite) => {
	return Contact.findByIdAndUpdate({ _id: id }, { favorite });
};

const remove = (id) => {
	return Contact.findByIdAndDelete({ _id: id });
};

module.exports = {
	getAll,
	getOne,
	create,
	update,
	updateStatus,
	remove,
};
