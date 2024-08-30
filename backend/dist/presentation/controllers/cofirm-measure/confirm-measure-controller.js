"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmMeasureController = void 0;
const errors_1 = require("../../errors");
const http_helper_1 = require("../../helpers/http-helper");
const measure_not_found_1 = require("../../errors/measure-not-found");
const measure_already_confirmed_error_1 = require("../../errors/measure-already-confirmed-error");
class ConfirmMeasureController {
    measureRepository;
    constructor(measureRepository) {
        this.measureRepository = measureRepository;
    }
    async handle(req) {
        const requiredFields = ['measure_uuid', 'confirmed_value'];
        for (const field of requiredFields) {
            if (!req[field]) {
                return (0, http_helper_1.badRequest)(new errors_1.InvalidParamError(field));
            }
        }
        const measure = await this.measureRepository.findById(req.measure_uuid);
        if (!measure) {
            return (0, http_helper_1.notFound)(new measure_not_found_1.MeasureNotFoundError(), "MEASURE_NOT_FOUND");
        }
        if (measure.isConfirmed) {
            return (0, http_helper_1.conflictError)(new measure_already_confirmed_error_1.MeasureAlreadyConfirmedError(), "CONFIRMATION_DUPLICATE");
        }
        await this.measureRepository.confirm(measure.uuid, req.confirmed_value);
        const body = {
            success: true
        };
        return {
            statusCode: 200,
            body
        };
    }
    ;
}
exports.ConfirmMeasureController = ConfirmMeasureController;
