// const { serverConfig } = require("../config");


// exports.globalErrorHandler = (err, req, res, next) => {
// 	if (serverConfig.environment === 'production') {
// 		return res.status(err.status ?? 500).json({
// 			msg: !err.status || err.status === 500 ? 'Internal server error' : err.message,
// 		});
// 	}

// 	res.status(err.status ?? 500).json({
// 		msg: err.message,
// 		data: err.data,
// 		stack: err.stack,
// 	});
// };

