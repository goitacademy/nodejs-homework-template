const mongoose = require("mongoose");

const connectDatabase = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://Arleta:Tti%40Ea44yZf$2dn@cluster0.bkymibz.mongodb.net/?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false,
			}
		);

		console.log("Database connection successful");
	} catch (error) {
		console.error("Database connection error:", error);
		process.exit(1);
	}
};

module.exports = connectDatabase;
