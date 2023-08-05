const app = require('./app')

const PORT = process.env.PORT || 3000;
const uriDb = process.env.MONGO_URL;

mongoose.set('strictQuery', true)

const connection = mongoose.connect(uriDb, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
