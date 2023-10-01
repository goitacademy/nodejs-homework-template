import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Set name for contact'],
	},
	email: String,
	phone: String,
	favorite: {
		type: Boolean,
		default: false,
	},
});

const connectDB = async (user, password) => {
	try {
		const uri = `mongodb+srv://${user}:${password}@cluster0.wmvohd7.mongodb.net/db-contacts?retryWrites=true&w=majority`;
		await mongoose.connect(uri);
		console.log('Database connection successful');
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
		process.exit(1);
	}
};

export const Contact = mongoose.model('Contact', contactSchema);

export default connectDB;
