export const notFoundHandler = (req, res, next) => {
	res.status(404).json({
		message: 'This rout is not exist, please check the documentation',
	});
};
