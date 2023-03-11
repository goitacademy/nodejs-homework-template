module.exports = fn => (req, res, next) => {
	fn(req, res, next).catch(
		next(error => res.status(500).json({ message: error.message }))
	);
};
