// const { serverConfig } = require("../config");

// exports.globalError = (err, req, res, next) => {
// 	let msg;
// 	let stack;
// 	let error;

// 	if (serverConfig.environment === 'development') {
// 		msg = err.message;
// 		stack = err.stack;
// 		error = err;
// 	} else {
// 		msg = err.status === 500 ? 'Internal server error' : err.message;
// 	}

// 	res.status(err.status ?? 500).json({
// 		msg,
// 		stack,
// 		error,
// 	});

// };
