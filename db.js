import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDatabase = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		console.log("Database connection successful");
	} catch (error) {
		console.error("Database connection error:", error);
		process.exit(1);
	}
};

export { connectDatabase };
