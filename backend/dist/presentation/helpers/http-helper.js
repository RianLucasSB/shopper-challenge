"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conflictError = exports.notFound = exports.badRequest = void 0;
const badRequest = (error, errorCode = 'INVALID_DATA') => {
    return {
        statusCode: 400,
        body: {
            error_code: errorCode,
            error_description: error.message,
        },
    };
};
exports.badRequest = badRequest;
const notFound = (error, errorCode) => {
    return {
        statusCode: 404,
        body: {
            error_code: errorCode,
            error_description: error.message,
        },
    };
};
exports.notFound = notFound;
const conflictError = (error, errorCode) => {
    return {
        statusCode: 409,
        body: {
            error_code: errorCode,
            error_description: error.message,
        },
    };
};
exports.conflictError = conflictError;
