const { ctrlWrapper } = require("../../helpers");

const getcurrent = async (req, res) => {
	const { email, name } = req.user;

	res.json({
		email,
		name,
	});
};

module.exports = { getcurrent: ctrlWrapper(getcurrent) };
