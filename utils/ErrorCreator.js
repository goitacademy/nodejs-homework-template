const msg = {
	400: 'Bad Request',
	401: 'Unauthorized',
	403: 'Forbidden',
	404: 'Not Found',
	409: 'Conflict',
}

const ErrorCreator = (status, message = msg[status]) => {
	const error = new Error(message)
	error.status = status
	return error
}

module.exports = ErrorCreator
