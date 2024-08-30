"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureAlreadyConfirmedError = void 0;
class MeasureAlreadyConfirmedError extends Error {
    constructor() {
        super(`Leitura do mês já realizada`);
        this.name = 'MeasureAlreadyConfirmedError';
    }
}
exports.MeasureAlreadyConfirmedError = MeasureAlreadyConfirmedError;
