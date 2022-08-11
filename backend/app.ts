import express,
{
  Request,
  Response,
  NextFunction,
  urlencoded,
} from "express";
import logger from 'morgan';
import cors from 'cors';
import { serverLogger } from './helpers/server-logger';
import contactsRouter from './routes/api/contacts';
import userRouter from "./routes/api/users";
import path from "path";

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger));

app.use(cors());

app.use(express.json());

app.use(urlencoded({
  extended: false,
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(serverLogger);


app.use('/api/v1/contacts', contactsRouter)

app.use('/users', userRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({ message })
})

export default app;
