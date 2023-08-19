const mongoose = require('mongoose');

const connectionDB = async() => {
	try {
		const connection = await mongoose.connect(
			`mongodb+srv://alinabielska:3RRR59GU66yhQqDt@cluster0.gj0lg4m.mongodb.net/db-contacts?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
                useUnifiedTopology: true,
			}
		)
		console.log(`Database connection successful`)
	} catch (error) {
		console.error(error.message)
		process.exit(1)
	}
};

module.exports = connectionDB