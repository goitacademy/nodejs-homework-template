import configDotEnv from '../config/setEnvVariables';
import app from './app';
import connectDB from '../config/connectDB';
import colors from 'colors';
configDotEnv();

const start = async () => {
  try {
    const { PORT = 5000 } = process.env;
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (error: any) {
    console.log(colors.red(error.message.bold));
    process.exit(1);
  }
}


(async () => {
  await start()
})();
