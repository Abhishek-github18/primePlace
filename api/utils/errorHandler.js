export const errorHandler = (statusCode, message) => {
    const error = new Error(message);
    error.status = false;
    error.statusCode = statusCode;
    return error;
}