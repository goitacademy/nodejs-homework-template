import mongoose from 'mongoose';

const connection = async () => {
    try {
        return (
            await mongoose.connect(process.env.DB_HOST, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            console.log('Database connection: OK')
        );
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
export default connection;
