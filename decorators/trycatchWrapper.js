const trycatchWrapper = ctrl => {
	const func = async (req, res, next) => {
		try {
			await ctrl(req, res, next);
		} catch (e) {
			next(e);
		}
	};

	return func;
};

export default trycatchWrapper;
