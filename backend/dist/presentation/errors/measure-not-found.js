"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureNotFoundError = void 0;
class MeasureNotFoundError extends Error {
    constructor() {
        super(`Leitura não encontrada`);
        this.name = 'MeasureNotFoundError';
    }
}
exports.MeasureNotFoundError = MeasureNotFoundError;
