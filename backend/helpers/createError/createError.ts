import errorMessages from './errorMessages';
import TError from './createErrorTS';


const createError = ({
    status,
    messageProd = errorMessages[status],
    messageDev = messageProd,
    nodeEnv = 'production',
}: { status: number, messageProd?: string, messageDev?: string, nodeEnv?: string }): TError => {
    let message = '';
    if (nodeEnv === 'production') {
        message = messageProd;
    }
    if (nodeEnv === 'development') {
        message = messageDev;
        console.log(message);

    }

    const error: TError = new Error(message);
    error.status = status;
    return error;
}

export default createError;

