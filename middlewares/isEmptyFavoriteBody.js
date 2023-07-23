import HttpError from "../helpers/HttpError.js";

const isEmptyFavoriteBody = (req, res, next) => {
	const { length } = Object.keys(req.body);
	if (!length) {
		next(HttpError(400, "missing field favorite"))
	}
	next()
}

export default isEmptyFavoriteBody