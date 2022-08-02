import path from 'path';
import dotenv from 'dotenv';

const configDotEnv = () => {
    dotenv.config({
        path: path.join(__dirname, '..', 'config', '.env')
    });
}
export default configDotEnv;