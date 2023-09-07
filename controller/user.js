// const { getAllUsers, getUserById } = require("../services/index");

// const getUsers = async (req, res, next) => {
// 	try {
// 		const allUsers = await getAllUsers();
// 		res.status(200).json(allUsers);
// 	} catch (e) {
// 		console.error(e);
// 		next(e);
// 	}
// };

// const getUserByIndex = async (req, res, next) => {
// 	const { id } = req.params;
// 	try {
// 		const result = await getUserById(id);
// 		if (result) {
// 			return res.status(200).json(result);
// 		} else {
// 			return res
// 				.status(404)
// 				.json({ message: `Not found user id: ${id}` });
// 		}
// 	} catch (e) {
// 		console.error(e);
// 		next(e);
// 	}
// };

// module.exports = { getUsers, getUserByIndex };
