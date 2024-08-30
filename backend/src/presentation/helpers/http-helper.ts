import { HttpError, type HttpResponse } from '../protocols/http';

export const badRequest = (error: Error, errorCode: string = 'INVALID_DATA'): HttpResponse<HttpError> => {
  return {
    statusCode: 400,
    body: {
      error_code: errorCode,
      error_description: error.message,
    },
  };
};

export const notFound = (error: Error, errorCode: string): HttpResponse<HttpError> => {
  return {
    statusCode: 404,
    body: {
      error_code: errorCode,
      error_description: error.message,
    },
  };
};

export const conflictError = (error: Error, errorCode: string): HttpResponse => {
  return {
    statusCode: 409,
    body: {
      error_code: errorCode,
      error_description: error.message,
    },
  };
};
