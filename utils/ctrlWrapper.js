const ctrlWrapper = (ctrl) => {
	const func = async (req, res, next) => {
		try {
			ctrl(req, res, next)
		} catch (err) {
			next(err.message)
		}
	}
	return func
}
module.exports = ctrlWrapper
