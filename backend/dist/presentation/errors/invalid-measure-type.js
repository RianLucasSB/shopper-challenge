"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidMeasureTypeError = void 0;
class InvalidMeasureTypeError extends Error {
    constructor() {
        super(`Tipo de medição não permitida`);
        this.name = 'InvalidMeasureTypeError';
    }
}
exports.InvalidMeasureTypeError = InvalidMeasureTypeError;
