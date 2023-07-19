const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const current = async (req, res) => {
    // const { token = "" } = req.header;
    // result 
};

module.exports = ctrlWrapper(current);
