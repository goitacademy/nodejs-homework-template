const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			`mongodb+srv://lukaszkogut1996:9SBZWVOZr10EOb3k@cluster0.ruhcawt.mongodb.net/db-contacts`,
			{
				useNewUrlParser: true,
			}
		)
		console.log(`Database connection successful`)
	} catch (error) {
		console.error(error.message)
		process.exit(1)
	}
}
module.exports = connectDB
