const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://szajblerd:OH5hBatkM5C3aWJL@cluster0.eyvfedr.mongodb.net/?retryWrites=true&w=majority'
const dbConnect = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
          useUnifiedTopology: true,
        });
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection error', error);
        process.exit(1);
    }
};

module.exports = dbConnect