import { HttpError, type HttpResponse } from '../protocols/http';

export const badRequest = (error: Error): HttpResponse<HttpError> => {
  return {
    statusCode: 400,
    body: {
      error_code: 'INVALID_DATA',
      error_description: error.message,
    },
  };
};

export const conflictError = (error: Error): HttpResponse => {
  return {
    statusCode: 409,
    body: {
      error_code: 'DOUBLE_REPORT',
      error_description: error.message,
    },
  };
};
