const statusMessages = {
	400: 'Bad request',
	401: 'Unauthorized',
	404: 'Not found',
	409: 'Conflict',
	500: 'Server error',
}

const createError = (status, message) => {
	if (message) {
		message = `${statusMessages[status]}: ${message}`
	} else {
		message = statusMessages[status]
	}
	const error = new Error(message)
	error.status = status
	return error
}

module.exports = createError
