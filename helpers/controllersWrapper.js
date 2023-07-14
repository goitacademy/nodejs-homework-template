const controllersWrapper = (contr) => {
	const f = async (req, res, next) => {
		try {
			await contr(req, res, next);
		} catch (error) {
			next(error);
		}
	};
	return f;
};

module.exports = controllersWrapper;
